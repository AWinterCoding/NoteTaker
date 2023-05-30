const express = require("express");
const path = require("path");
const notes = require("./Develop/db/db.json");
const gUI = require("generate-unique-id");

const app = express();
const PORT = 3001;

app.use(express.static("public"));

//default response to send back the index.html/landing page
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "Develop/public/index.html"))
);

//response to send back the notes page
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "Develop/public/notes.html"))
);

app.get("/api/notes", (req, res) => res.json(notes));

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
