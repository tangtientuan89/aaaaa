var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var login = require("./routes/login");
var app = express();
var cors = require("cors");

app.use(cors());
const server = require("http").Server(app);
const io = require("socket.io")(server);

server.listen(80);
// WARNING: app.listen(80) will NOT work here!

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });
let users = {};
io.on("connection", (socket) => {
  socket.on("open-chat", (user) => {
  users[user.from]=user.from
  users[user.to]=user.to
   console.log('user',users)
  });
  socket.on(users.tuan, (data) => {
    console.log(data)
    socket.emit(users.tuan, data);
  });
  socket.on(users.admin, (data) => {
    console.log(data)
    socket.emit(users.admin,data);

  });
  socket.on("all",data=>{
    console.log(data)
    socket.broadcast.emit("all",data)
  })
});
io.on('connection', (socket) => {

  socket.emit('connections', Object.keys(io.sockets.connected).length);

  socket.on('disconnect', () => {
      console.log("A user disconnected");
  });

  socket.on('chat-message', (data) => {
      socket.broadcast.emit('chat-message', (data));
  });

  socket.on('typing', (data) => {
      socket.broadcast.emit('typing', (data));
  });

  socket.on('stopTyping', () => {
      socket.broadcast.emit('stopTyping');
  });

  socket.on('joined', (data) => {
      socket.broadcast.emit('joined', (data));
  });

  socket.on('leave', (data) => {
      socket.broadcast.emit('leave', (data));
  });

});
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use("/", indexRouter);
// app.use("/users", usersRouter);
app.use("/", login);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
