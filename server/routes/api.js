const express = require("express");
const router = express.Router();

const wonders = [
  { name: "Mount Everest", location: "Nepal", visited: false },
  { name: "Grand Canyon", location: "Arizona", visited: false },
  { name: "Botanical Gardens", location: "Singapore", visited: true },
  { name: "Pantheon", location: "Greece", visited: false },
  { name: "Colosseum", location: "Italy", visited: true },
];

router.get("/wonders", function (req, res) {
  res.send(wonders);
});

router.put("/wonders/:name", function (req, res) {
  const wonderName = req.params.name;
  const foundWonder = wonders.find((wonder) => wonder.name === wonderName);
  console.log(`PUT created!`);

  if (foundWonder) {
    foundWonder.visited = true;

    console.log(`Visited status updated for ${foundWonder.name}`);

    res.send({ message: "Visited status updated successfully" });
  }
  console.log(wonders);
});

router.delete("/wonder/:name", function (req, res) {
  let wonder = req.params.name;
  let wondersIndex = wonders.findIndex((w) => w.name === wonder);
  wonders.splice(wondersIndex, 1);
  console.log(wonders);
  res.end();
});

router.post("/wonder/", function (req, res) {
  const obj = req.body;
  obj.visited = false;
  wonders.push(obj);
  console.log(req.body);
  console.log(wonders);
  console.log("Someone's trying to make a post request");
  res.end;
});

module.exports = router;
