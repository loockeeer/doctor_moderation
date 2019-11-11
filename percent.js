const fs = require('fs');
const README = fs.readFileSync('./README.md', 'utf8');
const todo = README.match(/\[ \]/g);
const coded = README.match(/\[x\]/g);
console.log(coded.length/todo.length);
