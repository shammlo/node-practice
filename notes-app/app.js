// const validator = require('validator');
const chalk = require('chalk');
const notes = require('./notes');
const yargs = require('yargs');
// ***************************************

const log = console.log;
const command = process.argv[2];
yargs
    .command({
        command: 'add',
        describe: 'Add a new note',
        builder: {
            title: {
                describe: 'Note title',
                demandOption: true,
                type: 'string',
            },
            body: {
                describe: 'Note body',
                demandOption: true,
                type: 'string',
            },
        },
        handler: (args) => {
            if (args.title && args.body) {
                notes.addNote(args.title, args.body);
            } else {
                log(chalk.yellow('Title and body is required!!'));
            }
        },
    })
    .fail(function (msg, err) {
        console.log(chalk.red(msg));
    });

yargs
    .command({
        command: 'delete',
        describe: 'Delete a note',
        builder: {
            title: {
                describe: 'Note title',
                demandOption: true,
                type: 'string',
            },
        },
        handler: (args) => {
            notes.deleteNote(args.title);
        },
    })
    .fail(function (msg, err) {
        console.log(chalk.red(msg));
    });
yargs.command({
    command: 'read',
    describe: 'Read a note',
    handler: () => console.log(chalk.blue('Read a note...')),
});
yargs.command({
    command: 'list',
    describe: 'List all notes',
    handler: () => console.log(chalk.magenta('List all notes')),
});
yargs.command({
    command: 'delete-all',
    describe: 'Delete all notes',
    handler: () => notes.deleteAll(),
});

yargs.parse();
