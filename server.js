const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

app.put("/wonders/:name", function (req, res) {
  const wonderName = req.params.name;
  const foundWonder = wonders.find((wonder) => wonder.name === wonderName);

  if (foundWonder) {
    foundWonder.visited = true;

    console.log(`Visited status updated for ${foundWonder.name}`);

    res.send({ message: "Visited status updated successfully" });
  }
});

app.post("/wonder/", function (req, res) {
  const obj = req.body;
  obj.visited = false;
  wonders.push(obj);
  console.log(req.body);
  console.log(wonders);
  console.log("Someone's trying to make a post request");
  res.end;
});

const port = 1337; //because why not
app.listen(port, function () {
  console.log(`Server running on ${port}`);
});
