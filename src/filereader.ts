export function filereader(file:string) {   
    var fs = require("fs");
    var text = fs.readFileSync(`./${file}`).toString('utf-8');
    return text.split("\n");
}