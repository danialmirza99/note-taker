const notes = require('express').Router();

const {
    readFromFile,
    readAndAppend,
    writeToFile,
  } = require('../assets/js/fsUtils');

notes.get('/', (req, res) => {
readFromFile('../db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.get('/:note_id', (req, res) => {
const noteId = req.params.tip_id;
readFromFile('../db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
    const result = json.filter((note) => note.note_id === noteId);
    return result.length > 0
        ? res.json(result)
        : res.json('No tip with that ID');
    });
});

notes.delete('/:note_id', (req, res) => {
    const noteId = req.params.note_id;
    readFromFile('../db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        const result = json.filter((note) => note.note_id !== noteId);
        writeToFile('../db/db.json', result);
        res.json(`Item ${noteId} has been deleted`);
      });
});

notes.post('/', (req, res) => {
    console.log(req.body);
    const { title, text } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
      };
  
      readAndAppend(newNote, '../db/db.json');
      res.json(`Note added successfully`);
    } else {
      res.error('Error in adding note');
    }
  });
  
  module.exports = notes;