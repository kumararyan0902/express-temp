import "dotenv/config";
// require("dotenv").config();
import express from "express";

const app = express();
// const port = 3000; //without using environment variable... hardcoded and exposed it
const port = process.env.PORT; //now using port nummber via .env folder...

// app.get("/", (request, response) => {
//   response.send(`Hello World...!!`);
// });
// app.get("/ice-tea", (request, response) => {
//   response.send(`Nhi h chai chalega.. adrak wala..??`);
// });
// app.get("/adrak", (request, response) => {
//   response.send(`Shabass chai ya coffee..???  `);
// });

app.use(express.json());

let randomData = [];
let nextId = 1;

// add anything.. input with RAW
app.post("/sahi", (req, res) => {
  const { name, price } = req.body;
  const naya = { id: nextId++, name, price };
  randomData.push(naya);
  res.status(201).send(naya);
});

//to print or get all the things
app.get("/sahi", (req, res) => {
  res.status(201).send(randomData);
});

//get any thing in particular with :id or :superman
app.get("/sahi/:id", (req, res) => {
  const thing = randomData.find((t) => t.id === parseInt(req.params.id));
  if (!thing) {
    return res.status(404).send(`Nhai mila....!!!`);
  }
  res.status(200).send(thing);
});

//update any thing in particular with :id or :superman
app.put("/sahi/:id", (req, res) => {
  const thing = randomData.find((t) => t.id === parseInt(req.params.id));
  if (!thing) {
    return res.status(404).send(`Nhai mila....!!!`);
  }
  // res.status(200).send(thing);
  const { name, price } = req.body;
  thing.name = name;
  thing.price = price;
  // randomData.push(naya);
  res.status(201).send(thing);
});

//delete thing in particular with :id or :superman
app.delete("/sahi/:id", (req, res) => {
  const index = randomData.findIndex((t) => t.id === parseInt(req.params.id));
  if (!index === -1) {
    return res.status(404).send(`Nhai mila....!!!`);
  }
  randomData.splice(index, 1);
  res.status(204).send(`Udd Gaya`);
});

app.listen(port, () => {
  console.log(`Server is lisiting to port ${port}.....`);
});
