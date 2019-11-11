const fs = require('fs');
const README = fs.readFileSync('./README.md');
console.log(README);
