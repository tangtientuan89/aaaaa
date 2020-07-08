let a = new Promise(function (resolve, reject) {
  let a = 0;
  setTimeout(function () {
    a = 1;
    resolve(a);
  }, 3000);
});
let b = new Promise(function (resolve, reject) {
  let b = 0;
  setTimeout(function () {
    b = 2;
    resolve(b);
  }, 2000);
});
let c = new Promise(function (resolve, reject) {
  let c = 0;
  setTimeout(function () {
    c = 3;
    resolve(c);
  }, 1000);
});

let test = async function () {
  let a1 = new Promise(function (resolve, reject) {
    let a = 0;
    setTimeout(function () {
      a = 1;
      resolve(a);
    }, 3000);
  });
  let b1 = new Promise(function (resolve, reject) {
    let b = 0;
    setTimeout(function () {
      b = 2;
      resolve(b);
    }, 2000);
  });
  let c1 = new Promise(function (resolve, reject) {
    let c = 0;
    setTimeout(function () {
      c = 3;
      resolve(c);
    }, 1000);
  });

  console.log(await a1);
  console.log(await b1);
  console.log(await c1);
};
test();
