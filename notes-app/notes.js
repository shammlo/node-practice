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

    debugger;
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
// ------------------------------------------------
// * Delete all notes
const deleteAll = () => {
    const notes = loadNotes();
    if (notes.length > 0) {
        console.log(chalk.green.inverse('All notes deleted!'));
        saveNote([]);
    } else {
        console.log(chalk.red.inverse('No notes found!'));
    }
};

// ------------------------------------------------
// * List all note

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.blue('Your notes: '));
    if (notes.length > 0) {
        notes.forEach((note) => {
            console.log(note.title, note.body);
        });
    } else {
        console.log(chalk.red.inverse('No notes found!'));
    }
};
// ------------------------------------------------

// ------------------------------------------------
// * Read a note

const readNote = (title) => {
    const notes = loadNotes();

    const wantedNotes = notes.find((note) => note.title === title);

    if (wantedNotes) {
        console.log(chalk.blue('Title: ') + chalk.magenta(wantedNotes.title));
        console.log(chalk.blue('Body: ') + chalk.magenta(wantedNotes.body));
    } else {
        console.log(chalk.red.inverse('No note found!'));
    }
};

// ------------------------------------------------
// * module exports
module.exports = {
    addNote: addNote,
    deleteNote: deleteNote,
    deleteAll: deleteAll,
    listNotes: listNotes,
    readNote: readNote,
};
