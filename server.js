const express = require("express");
const fs = require("fs");
const notes = require("./Develop/db/db.json")
const path = require("path");
const uuid = require("uuid");

const app = express();
const PORT = 3001;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//saves notes and adds to db.json
app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./Develop/db/db.json"))
});

// function to add new notes
app.post("/api/notes", (req,res) => {
    const notes = JSON.parse(fs.readFileSync("./Develop/db/db.json"));
    const newNotes = req.body;
    newNotes.id = uuid.v4();
    notes.push(newNotes);
    fs.writeFileSync("./Develop/db/db.json", JSON.stringify(notes));
    res.json(notes);
})

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);