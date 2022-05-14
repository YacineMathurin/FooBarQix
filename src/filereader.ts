var fs = require("fs");
var text = fs.readFileSync("./file.txt").toString('utf-8');
export const textByLine = text.split("\n");