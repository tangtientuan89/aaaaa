var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
const account = [
  { email: "admin", password: "1",type:1 },
  { email: "user1", password: "1",type:3 },
  { email: "user2", password: "1",type:3 },
];
router.post("/login", function (req, res) {
  let email = req.body.email;
  let password = req.body.password;
  let found = account.find((element) => {
    if (email == element.email && password == element.password) return element;
  });
  if (found) {
    console.log('email', email)
    let token = jwt.sign(
      {
        data: email,
      },
      "secret",
      { expiresIn: "1d" }
    );
    return res.json({
      status: 200,
      data: {token:token,user:found.email,type:found.type},
    });
  } else {
    return res.json({
      status: 404,
      message: "sai tài khoản hoặc mật khẩu",
    });
  }
});
router.get("/restaurant", function (req, res) {
  console.log('object')
  try {
    let token = req.headers.authorization.split("token=")[1].split(";")[0];
    console.log("token", token);
    let decoded = jwt.verify(token, "secret");
    console.log(decoded);
    if (decoded.data == account.email) {
      return res.json({
        status: 200,
      });
    }
    return res.json({
      status: 200,
      message: "hay dang nhap",
    });
  } catch (err) {
    return res.json({
      status: 404,
      message: err,
    });
  }
});

module.exports = router;
