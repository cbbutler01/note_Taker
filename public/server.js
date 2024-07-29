const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const db = path.join(__dirname, 'db.json');

const readNotes = () => {
    const data = fs.readFileSync(db, 'utf8')
    return JSON.parse(data);
};

const writeNotes = (notes) => {
    fs.writeFileSync(db, JSON.stringify(notes, null, 2));
};

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'notes.html'))
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/notes', (req, res) => {
    const notes = readNotes();
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
    const notes = readNotes();
    const newNote = { id: uuidv4(), ...req.body}
    notes.push(newNote);
    writeNotes(notes);
    res.json(newNote);
});

app.delete('/api/notes/:id', (req, res) => {
    let notes = readNotes();
    const { id } = req.params;
    notes = notes.filter(note => note.id !== id);
    writeNotes(notes);
    res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
