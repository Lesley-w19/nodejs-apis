//require the file system
const fs = require("fs/promises");
//require express
const express = require("express");
//require cors cross origin resouse sharing
const cors = require("cors");
//require lodash - pick a random element from the array
const _ = require("lodash");
// require uuid  -to generate a unique id
const { v4: uuid } = require("uuid");

const path = require("path");

//setup the server
const app = express();

app.get("/clothes", (req, res) => {
  const dress = ["Marroon", "Red", "Yellow", "Blue", "Green", "Peach"];
  const tops = ["Blue", "Green", "Yellow", "Dark Green", "Pink", "White"];
  const trousers = ["Black", "White", "Dark Green", "Blue", "Grey", ""];
  const shoes = ["Black", "White", "Dark Green"];

  res.json({
    dress: _.sample(dress),
    tops: _.sample(tops),
    trousers: _.sample(trousers),
    shoes: _.sample(shoes),
  });

  //see if server is working
  //   res.send("This is working");
});

app.use(express.json());
//get all books
app.get("/books", async (req, res) => {
  try {
    const files = await fs.readdir(path.join(__dirname, "./data/books"));
    res.json({
      files: files,
    });
  } catch (error) {
    console.log(error);
  }
});
app.post("/books", async (req, res) => {
  const id = uuid();
  //JSON.stringify() function is used to convert a JavaScript object into a string.
  const content = JSON.stringify(req.body.content);

  //status return if content not found
  if (!content) {
    return res.sendStatus(400, "Content not found");
  }

  //   /make directory to save data
  await fs.mkdir("data/books", {
    recursive: true,
  });
  //create a new file that saves the books data
  await fs.writeFile(`data/books/${id}.txt`, content);

  res.status(201).json({
    id: id,
    content: content,
  });
});
//get from a given file
app.get("/books/:id", async (req, res) => {
  const id = req.params.id;
  let content;
  let data;
  try {
    content = await fs.readFile(`data/books/${id}.txt`, "utf-8");
    data = JSON.parse(content);

    res.json({
      content: data,
    });
  } catch (error) {
    console.log(error);
  }
});

app.put("/books/:id", async (req, res) => {
  const id = req.params.id;
  const update = JSON.stringify(req.body.content);
  //status return if content not found
  if (!id) {
    return res.sendStatus(400, "Content not found");
  }
  //update the file
  await fs.writeFile(`data/books/${id}.txt`, update);

  res.status(200).json({
    id: id,
    content: JSON.parse(update),
  });
});

app.delete("/books/:id", async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.sendStatus(400, "No id");
  }
  try {
    await fs.rm(`data/books/${id}.txt`);
    res.sendStatus(200, "Book deleted");
  } catch (error) {
    console.log(error);
  }
});

const port = 8080;

app.listen(port, () => {
  console.log("API Server is running on port " + port);
});
