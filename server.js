const express = require("express");
const path = require("path");
const notes = require("./Develop/db/db.json");
let uniqid = require("uniqid");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 33920;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("Develop/public"));

//default response to send back the index.html/landing page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "Develop/public/index.html"));
});

//response to send back the notes page
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "Develop/public/notes.html"))
);

//api get request
app.get("/api/notes", (req, res) => {
  fs.readFile("Develop/db/db.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
      res.send(data);
    }
  });
});

//post method for the api
app.post("/api/notes", (req, res) => {
  const { title, text } = req.body;
  const id = uniqid();
  if (title && text) {
    const newNote = {
      title,
      text,
      id,
    };
    const noteString = JSON.stringify(newNote);

    //method to append the json to the JSON array
    fs.readFile("Develop/db/db.json", "utf8", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const noteData = JSON.parse(data);
        noteData.push(newNote);
        fs.writeFile("Develop/db/db.json", JSON.stringify(noteData), (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Note written to file");
          }
        });
      }
    });

    const response = {
      status: "success",
      body: noteString,
    };
    res.status(201).json(response);
  } else {
    res.status(500).json("Error in Taking Note");
  }
});

//server running on...
app.listen(port, () => console.log(`App listening on port ${port}`));
