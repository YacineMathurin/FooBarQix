import * as Const from "./constants";
import { map } from "./index";
import { handleTeleporting, handleContext } from "./functions";
const { obstacleTag, positionTag } = Const;


let currentPositionIndex: number = map.indexOf(positionTag);
let nextIdx: number = 0;
let directionIndex: number = 0;

let forwardMode: boolean = true;
let drunk:  boolean = false;
let shouldTeleport:  boolean = false;
let context = directions[directionIndex];

// We dectect the tag symbol at next step then move accordingly
const main = () => {
    if(shouldTeleport) return handleTeleporting();
    nextIdx = currentPositionIndex + context["step"];
    // if(res[nextIdx] === gameOverTag) return;
    handleContext(res[nextIdx]);
}

while(res[nextIdx] !== gameOverTag) main();

// MUST DEAL WITH LOTS OF RETURNED VALUES
