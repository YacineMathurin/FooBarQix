import { startup } from "./startup";
import * as Const from "./constants";
const { 
    SOUTH_TAG,
    EAST_TAG, 
    NORTH_TAG, 
    WEST_TAG,
    OBSTACLE_TAG,
    BEER_TAG,
    TELEPORTER_TAG,
    INVERTER_TAG,
    BORDER_TAG,
} = Const;
const {colNumbers, map} = startup();

// ContextFn
const moveToSouth: (currentPositionIndex: number) => number = (currentPositionIndex) =>   currentPositionIndex += directions[0]["step"];
const moveToEast: (currentPositionIndex: number) => number = (currentPositionIndex) =>  currentPositionIndex += directions[1]["step"]
const moveToNorth: (currentPositionIndex: number) => number = (currentPositionIndex) => currentPositionIndex += directions[2]["step"];
const moveToWest: (currentPositionIndex: number) => number = (currentPositionIndex) => currentPositionIndex += directions[3]["step"];
// ContextFn
const directions: Const.Context[] = [
    {headTo: "SOUTH", step: colNumbers, modifier: moveToSouth},
    {headTo: "EAST", step: 1, modifier: moveToEast},
    {headTo: "NORTH", step: -colNumbers, modifier: moveToNorth}, 
    {headTo: "WEST", step: -1, modifier: moveToWest}
];
// ContextFn
const handleContext = (exp = " ", currentPositionIndex = 0, directionIndex = 0, shouldTeleport = false, forwardMode = true, drunk = false, nextIdx = 0) => {
    console.log("symbole", exp);
    let responseResolveOutput = {currentPositionIndex: 0, context: directions[0]}
    switch (exp) {
        case SOUTH_TAG:
            // Get in then set next direction to head to
            responseResolveOutput = resolveOutput(currentPositionIndex, directionIndex);
            directionIndex = 0;
            break;
        case EAST_TAG:
            responseResolveOutput = resolveOutput(currentPositionIndex, directionIndex);
            directionIndex = 1;
            break;
        case NORTH_TAG:
            responseResolveOutput = resolveOutput(currentPositionIndex, directionIndex);
            directionIndex = 2;
            break;
        case WEST_TAG:
            responseResolveOutput = resolveOutput(currentPositionIndex, directionIndex);
            directionIndex = 3;
            break;
        case TELEPORTER_TAG:
            responseResolveOutput = resolveOutput(currentPositionIndex, directionIndex);
            shouldTeleport = true;
            break;
        case INVERTER_TAG:
            forwardMode = !forwardMode;
            responseResolveOutput = resolveOutput(currentPositionIndex, directionIndex);
            break;
        case BEER_TAG:
            drunk = !drunk;
            responseResolveOutput = resolveOutput(currentPositionIndex, directionIndex);
            break;
        case OBSTACLE_TAG:
            if(drunk) {
                // Just pass through and the obstacle is destroyed for ever
                map.splice(nextIdx, 1, " ");
                responseResolveOutput = resolveOutput(currentPositionIndex, directionIndex);
                return;
            }
            directionIndex = setDirectionIndex(forwardMode, directionIndex);
            responseResolveOutput = resolveOutput(currentPositionIndex, directionIndex);
            break;
        case BORDER_TAG:
            directionIndex = setDirectionIndex(forwardMode, directionIndex);
            responseResolveOutput = resolveOutput(currentPositionIndex, directionIndex);
            break;
        
        default:
            responseResolveOutput = resolveOutput(currentPositionIndex, directionIndex);
    }
    return {
        currentPositionIndex: responseResolveOutput.currentPositionIndex,
        context: responseResolveOutput.context,
        directionIndex, 
        shouldTeleport, 
        forwardMode, 
        drunk, 
    }
}
// Indep. Fn
const resolveOutput = (currentPositionIndex: number, directionIndex: number) => {
    let output = "";
    let context: Const.Context;
    if(directionIndex > 0)
        context = directions[directionIndex  % directions.length];
    else
        context = directions[(directions.length - (Math.abs(directionIndex)  % directions.length)) % directions.length];

    output = context["headTo"];
    console.log(output);
    currentPositionIndex = context["modifier"](currentPositionIndex);
    return { currentPositionIndex, context}
}
// Indep. Fn
const setDirectionIndex = (forwardMode: boolean, directionIndex: number) => {
    if(forwardMode) return directionIndex += 1;
    return directionIndex -= 1;
}

const handleTeleporting = (currentPositionIndex: number) => {

    // In fact, a native loop is faster on chrome that using indexOf
    for(let idx = 0; idx < map.length; idx++) {
        if(map[idx] === TELEPORTER_TAG && idx !== currentPositionIndex)
            currentPositionIndex = idx
    }
    const shouldTeleport = false;
    // return false
    return {shouldTeleport, currentPositionIndex};
}

export { handleContext, handleTeleporting, directions };
// MUST RETURN LOT OF THINGS