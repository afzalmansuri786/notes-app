const chalk = require("chalk");
const yargs = require("yargs");
const notes = require("./notes.js");
// const msg = getNotes();
// console.log(msg);
// const green = chalk.bold.bgYellow.inverse.yellow('Success');
// console.log(green);
// console.log(process.argv[2]);

// const command = process.argv[2];
// console.log(process.argv);
// if(command === 'add'){
//     console.log('Ading note!');
// } else if (command === 'remove'){
//     console.log('Removing note!');
// }

yargs.version("1.1.0");

//create add command
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    // console.log('Title : '+argv.title);
    // console.log('Body : '+argv.body);
    notes.addNotes(argv.title, argv.body);
  },
});

//create remove command
yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    notes.removeNotes(argv.title);
  },
});

//create list command
yargs.command({
  command: "list",
  describe: "Read a note",
  handler: () => {
    // console.log("Reading a note!");
    notes.listNotes();
  },
});

//create find command
yargs.command({
  command: "find",
  describe: "Read  notes",
  builder: {
    title: {
      describe: "Note details",
      demandOption: true,
      type: "string",
    }
  },
  handler: (argv) => {
    console.log("Read notes!");
    notes.readNotes(argv.title)
  },
});

yargs.parse();

// console.log(yargs.argv);
