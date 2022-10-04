const fs = require("fs");
const chalk = require('chalk');

const getNotes =  () => {
  return "Your notes...";
};

const addNotes = (title, body) => {
  const notes = loadNotes();
  // const duplicateNotes = notes.filter((note) => note.title === title);
  const duplicateNotes = notes.find((note) => note.title === title);


  debugger
  // console.log(duplicateNotes);
  // console.log(title);

  if (!duplicateNotes) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.green.inverse('Note title added successfully'));
  } else {
    console.log(chalk.red.inverse('Note title already exists'));
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes =  () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};


const removeNotes =  (title) => {
    try{
        const notes = loadNotes();
        const notesToKeep = notes.filter( (note) => note.title !== title)

        if (notes.length > notesToKeep.length) {
          console.log(chalk.green.inverse('Note title removed'));
          saveNotes(notesToKeep);
        } else {
          console.log(chalk.red.inverse('Note title not found'));
        }
        
    } catch (err) {
        console.log(err);
        
    }
};

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.yellow.inverse('Your notes'));
  // const dataJSON = notes.map(note => note.title);
  notes.forEach((note) => {
    console.log('Note title : ' + note.title);
  })
  // console.log(dataJSON);
}


const readNotes =  (title) => {
  const notes = loadNotes();
  const existNote = notes.find((note) => note.title === title)

  if(existNote){
    console.log(chalk.inverse('Note found'));
    console.log('Note title :' + existNote.title);
    console.log('Note body :' + existNote.body);
  } else {
    console.log(chalk.red.inverse('Note not found'));
  }
}



module.exports = {
  getNotes: getNotes,
  addNotes: addNotes,
  removeNotes: removeNotes,
  listNotes: listNotes,
  readNotes: readNotes,
};
