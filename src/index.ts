import {textByLine} from "./filereader";

const LINE_BREAKER = "\r";
let index: number = 0;
let map: string[] = []; 

const readLine = () => {
    const line: string = textByLine[index];
    index += 1;
    return line;
}

const dimensions = readLine().split(" ");
const rowNumbers = parseInt(dimensions[0]);
const colNumbers = parseInt(dimensions[1]);

for (let i = 0; i < rowNumbers; i++) {
    let row = readLine();
    let splitedRow = row.split("");

    if (splitedRow.indexOf(LINE_BREAKER) > 0) {
        splitedRow.splice(splitedRow.indexOf("\n"), 1)
    }
    map = map.concat(splitedRow);
    console.log("Row", row);
}
console.log(map);

export {rowNumbers, colNumbers, map}

