const fs = require('fs');
const README = fs.readFileSync('./README.md');
const toDoOccurs = README.match(/\[ \]/g);
const codedOccurs = README.match(/\[x\]/g);
console.log(codedOccurs.length/toDoOccurs.length)
