const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send("Hello World");
});

const emeilas = "gintare@gmail.com";
console.log(emeilas.indexOf("@"), "a");

app.listen(3000);
