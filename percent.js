const fs = require('fs');
const README = fs.readFileSync('./README.md', 'utf8');
const todo = README.match(/\[ \]/g);
const coded = README.match(/\[x\]/g);
console.log(`We have done ${Math.floor((coded.length/todo.length)*100)}% of the project !`);
