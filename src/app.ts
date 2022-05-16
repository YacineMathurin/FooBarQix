import * as Const from "./constants";
import { startup } from "./startup";
import { handleTeleporting, handleContext, directions } from "./functions";
const { GAMEOVER_TAG, POSITION_TAG } = Const;

let { map } = startup();
let currentPositionIndex: number = map.indexOf(POSITION_TAG);

let nextIdx: number = 0;
let directionIndex: number = 0;

let forwardMode: boolean = true;
let drunk:  boolean = false;
let shouldTeleport:  boolean = false;
let context = directions[directionIndex];

const setState = (
    {
        currentPositionIndex: newCurrentPositionIndex,
        context: newContext,
        directionIndex: newDirectionIndex, 
        shouldTeleport: newShouldTeleport, 
        forwardMode: newForwardMode,   
        drunk: newDrunk,
        map: newMap
    }: Const.RespContext) => 
{
    console.log("newDirectionIndex", newContext, "forwardMode", newForwardMode);

    currentPositionIndex = newCurrentPositionIndex
    context = newContext
    directionIndex = newDirectionIndex
    shouldTeleport = newShouldTeleport
    forwardMode = newForwardMode
    drunk = newDrunk,
    map = newMap
}
// We dectect the tag symbol at next step then move accordingly
const main = () => {  
    // console.log(drunk);

    if(shouldTeleport) { 
        const {shouldTeleport: resShouldTeleport, currentPositionIndex: respCurrentPositionIndex} = handleTeleporting(currentPositionIndex, map);
        shouldTeleport = resShouldTeleport;
        currentPositionIndex = respCurrentPositionIndex;
        return;
    }
    nextIdx = currentPositionIndex + context["step"];
    const res = handleContext(map[nextIdx], currentPositionIndex, directionIndex, shouldTeleport, forwardMode, drunk, nextIdx, map);
    if(res)
        setState(res)
}

// while(map[nextIdx] !== GAMEOVER_TAG) main() 
 main();   
 main();
 main(); 
 main();
 main();

// MUST DEAL WITH LOTS OF RETURNED VALUES
