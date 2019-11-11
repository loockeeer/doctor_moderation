const fs = require('fs');
const README = fs.readFileSync('./README.md');
const toDoOccurs = /\[ \]/g.match(README);
const codedOccurs = /\[x\]/g.match(README);
console.log(codedOccurs.length/toDoOccurs.length);
