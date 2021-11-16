const fs = require('fs');
const chalk = require('chalk');
// ********************************

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
};

const saveNote = (notes) => {
    const noteJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', noteJSON);
};

// ------------------------------------------------
// * Add a note
const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title);
    if (duplicateNote) {
        console.log(chalk.red('Note title taken!'));
    } else {
        notes.push({
            title: title,
            body: body,
        });
        saveNote(notes);
        console.log(chalk.green('Note added!'));
    }
};
// ------------------------------------------------
// * Delete a note
const deleteNote = (title) => {
    const notes = loadNotes();

    const wantedNote = notes.filter((note) => note.title !== title);

    if (notes.length > wantedNote.length) {
        console.log(chalk.green.inverse('Note deleted!'));
        saveNote(wantedNote);
    } else {
        console.log(chalk.red.inverse('No note found!'));
    }
};

const deleteAll = () => {
    const notes = loadNotes();
    if (notes.length > 0) {
        console.log(chalk.green.inverse('All notes deleted!'));
        saveNote([]);
    } else {
        console.log(chalk.red.inverse('No notes found!'));
    }
};
module.exports = { addNote: addNote, deleteNote: deleteNote, deleteAll: deleteAll };
