import { colNumbers, map } from "./index";
import * as Const from "./constants";
const { 
    southTag,
    eastTag, 
    northTag, 
    westTag,
    obstacleTag,
    beerTag,
    teleporterTag,
    inverterTag,
    borderTag,
} = Const;

export interface Context {
    headTo: string,
    step: number,
    modifier: (currentPositionIndex: number) => void
}
// ContextFn
const moveToSouth: (currentPositionIndex: number) => void = (currentPositionIndex) => currentPositionIndex += directions[0]["step"];
const moveToEast: (currentPositionIndex: number) => void = (currentPositionIndex) => currentPositionIndex += directions[1]["step"];
const moveToNorth: (currentPositionIndex: number) => void = (currentPositionIndex) => currentPositionIndex += directions[2]["step"];
const moveToWest: (currentPositionIndex: number) => void = (currentPositionIndex) => currentPositionIndex += directions[3]["step"];
// ContextFn
const directions: Context[] = [
    {headTo: "SOUTH", step: colNumbers, modifier: moveToSouth},
    {headTo: "EAST", step: 1, modifier: moveToEast},
    {headTo: "NORTH", step: -colNumbers, modifier: moveToNorth}, 
    {headTo: "WEST", step: -1, modifier: moveToWest}
];
// ContextFn
const handleContext = (exp = " ", currentPositionIndex = 0, directionIndex = 0, shouldTeleport = false, forwardMode = true, drunk = false, nextIdx = 0) => {
    switch (exp) {
        case southTag:
            // Get in then set next direction to head to
            resolveOutput(currentPositionIndex, directionIndex);
            directionIndex = 0;
            break;
        case eastTag:
            resolveOutput(currentPositionIndex, directionIndex);
            directionIndex = 1;
            break;
        case northTag:
            resolveOutput(currentPositionIndex, directionIndex);
            directionIndex = 2;
            break;
        case westTag:
            resolveOutput(currentPositionIndex, directionIndex);
            directionIndex = 3;
            break;
        case teleporterTag:
            resolveOutput(currentPositionIndex, directionIndex);
            shouldTeleport = true;
            break;
        case inverterTag:
            forwardMode = !forwardMode;
            resolveOutput(currentPositionIndex, directionIndex);
            break;
        case beerTag:
            drunk = !drunk;
            resolveOutput(currentPositionIndex, directionIndex);
            break;
        case obstacleTag:
            if(drunk) {
                // Just pass through and the obstacle is destroyed for ever
                map.splice(nextIdx, 1, " ");
                resolveOutput(currentPositionIndex, directionIndex);
                return;
            }
            setDirectionIndex(forwardMode, directionIndex);
            resolveOutput(currentPositionIndex, directionIndex);
            break;
        case borderTag:
            setDirectionIndex(forwardMode, directionIndex);
            resolveOutput(currentPositionIndex, directionIndex);
            break;
        
        default:
            resolveOutput(currentPositionIndex, directionIndex);
    }
}
// Indep. Fn
const resolveOutput = (currentPositionIndex: number, directionIndex: number) => {
    let output = "";
    let context: Context;
    if(directionIndex > 0)
        context = directions[directionIndex  % directions.length];
    else 
        context = directions[(directions.length - (Math.abs(directionIndex)  % directions.length)) % directions.length];

    output = context["headTo"];
    console.log(output);
    context["modifier"](currentPositionIndex);
}
// Indep. Fn
const setDirectionIndex = (forwardMode: boolean, directionIndex: number) => {
    if(forwardMode) return directionIndex += 1;
    directionIndex -= 1;
}

const handleTeleporting = (currentPositionIndex: number) => {

    // In fact, a native loop is faster on chrome that using indexOf
    for(let idx = 0; idx < map.length; idx++) {
        if(map[idx] === teleporterTag && idx !== currentPositionIndex)
            currentPositionIndex = idx
    }
    // shouldTeleport = handleTeleporting();
    // return false
    shouldTeleport = false;
}

export { handleContext, handleTeleporting };
// MUST RETURN LOT OF THINGS