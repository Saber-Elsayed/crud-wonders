const express = require("express");
const path = require("path");

const app = express();
app.use(express.static(path.join(__dirname, "dist")));
app.use(express.static(path.join(__dirname, "node_modules")));

const wonders = [
  { name: "Mount Everest", location: "Nepal", visited: false },
  { name: "Grand Canyon", location: "Arizona", visited: false },
  { name: "Botanical Gardens", location: "Singapore", visited: true },
  { name: "Pantheon", location: "Greece", visited: false },
  { name: "Colosseum", location: "Italy", visited: true },
];

app.get("/wonders", function (req, res) {
  res.send(wonders);
});

app.post("/wonder", function (req, res) {
  console.log(req.body);
  console.log("Someone's trying to make a post request");
});

const port = 1337; //because why not
app.listen(port, function () {
  console.log(`Server running on ${port}`);
});
