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
    STEP_FORWARD, 
    STEP_BACKWARD
} = Const;
export function functions(filename:string) {
    const { colNumbers } = startup(filename);
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
    const handleContext = (exp = " ", currentPositionIndex = 0, directionIndex = 0, shouldTeleport = false, forwardMode = true, drunk = false, nextIdx = 0, map: string[]) => {
        // console.log("Next symbole", exp, directionIndex);
        let responseResolveOutput = {currentPositionIndex: 0, context: directions[0]}
        let responseResolveOutputObstacles = {
            currentPositionIndex,
            context: { headTo: 'SOUTH', step: 5, modifier: moveToSouth },
            directionIndex, 
            shouldTeleport, 
            forwardMode,   
            drunk,
            map
        }
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
                // The new responseResolveOutput could be what resolveOutput responded plus other props
                shouldTeleport = true;
                break;
            case INVERTER_TAG:
                forwardMode = !forwardMode;
                // console.log("forwardMode", forwardMode, "directionIndex", directionIndex);
                
                responseResolveOutput = resolveOutput(currentPositionIndex, directionIndex);
                break;
            case BEER_TAG:
                drunk = !drunk;
                responseResolveOutput = resolveOutput(currentPositionIndex, directionIndex);
                break;
            case OBSTACLE_TAG:
                if(drunk) {
                    // Pass through and the obstacle is destroyed forever
                    map.splice(nextIdx, 1, " ");
                    responseResolveOutput = resolveOutput(currentPositionIndex, directionIndex);
                    break;
                }
                responseResolveOutputObstacles = setDirectionIndex(exp, currentPositionIndex, directionIndex, shouldTeleport, forwardMode, drunk, nextIdx, map);
                responseResolveOutput.currentPositionIndex = responseResolveOutputObstacles.currentPositionIndex;
                responseResolveOutput.context = responseResolveOutputObstacles.context;
                directionIndex = responseResolveOutputObstacles.directionIndex
                shouldTeleport = responseResolveOutputObstacles.shouldTeleport
                forwardMode = responseResolveOutputObstacles.forwardMode
                drunk = responseResolveOutputObstacles.drunk
                map = responseResolveOutputObstacles.map
                break;
            case BORDER_TAG:
                // console.log("BORDER_TAG", currentPositionIndex);
                responseResolveOutputObstacles = setDirectionIndex(exp, currentPositionIndex, directionIndex, shouldTeleport, forwardMode, drunk, nextIdx, map);
                // responseResolveOutput should pass more of its values in final return 
                responseResolveOutput.currentPositionIndex = responseResolveOutputObstacles.currentPositionIndex;
                responseResolveOutput.context = responseResolveOutputObstacles.context;
                directionIndex = responseResolveOutputObstacles.directionIndex
                shouldTeleport = responseResolveOutputObstacles.shouldTeleport
                forwardMode = responseResolveOutputObstacles.forwardMode
                drunk = responseResolveOutputObstacles.drunk
                map = responseResolveOutputObstacles.map
                break;
            
            default:
                // console.log("Default", currentPositionIndex, directionIndex); 
                responseResolveOutput = resolveOutput(currentPositionIndex, directionIndex);
        }
        // console.log("directionIndex before returning: ",exp, directionIndex);
        return {
            currentPositionIndex: responseResolveOutput.currentPositionIndex,
            context: responseResolveOutput.context,
            directionIndex, 
            shouldTeleport, 
            forwardMode, 
            drunk, 
            map
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
        // console.log(output);
        currentPositionIndex = context["modifier"](currentPositionIndex);
        return { currentPositionIndex, context}
    }
    const checkMovePossibility = (exp = " ", currentPositionIndex = 0, directionIndex = 0, shouldTeleport = false, forwardMode = true, drunk = false, nextIdx = 0, map: string[]) => {
        let context: Const.Context;
        let character: string;
        let responseResolveOutput = {
            currentPositionIndex,
            context: { headTo: 'SOUTH', step: 5, modifier: moveToSouth },
            directionIndex, 
            shouldTeleport, 
            forwardMode,   
            drunk,
            map
        }
        let res = {obstacleAgain: false, responseResolveOutput: responseResolveOutput};
        let localContext = 0;
        if(directionIndex > 0)
            context = directions[directionIndex  % directions.length];
        else
            context = directions[(directions.length - (Math.abs(directionIndex)  % directions.length)) % directions.length];
        // console.log("checkMovePossibility", currentPositionIndex);
        
        localContext = context["modifier"](currentPositionIndex);
        character = map[localContext]; 

        if (character !== BORDER_TAG && character !== OBSTACLE_TAG ) {
            // Specify where it gets into
            // console.log("before", currentPositionIndex);
            responseResolveOutput = handleContext(character, currentPositionIndex, directionIndex, shouldTeleport, forwardMode, drunk, nextIdx = 0, map)
            // Must take all from the response of handleContext: directionIndex, ...
            // console.log("after", responseResolveOutput.currentPositionIndex);
            
            res = {obstacleAgain: false, responseResolveOutput};
            // console.log("res", res);
            
            return res;
        }
        return {obstacleAgain: true, responseResolveOutput};
    }
    const movePossibility = (exp = " ", currentPositionIndex = 0, directionIndex = 0, shouldTeleport = false, forwardMode = true, drunk = false, nextIdx = 0, map: string[], step: number) => {
        let obstacleAgain = true;
        let responseResolveOutput = {
            currentPositionIndex,
            context: { headTo: 'SOUTH', step: 5, modifier: moveToSouth },
            directionIndex, 
            shouldTeleport, 
            forwardMode,   
            drunk,
            map
        }
        let res = {obstacleAgain: false, responseResolveOutput: responseResolveOutput};
        // console.log("movePossibility", currentPositionIndex);

        while (obstacleAgain) {
            directionIndex += step;
            res = checkMovePossibility(exp, currentPositionIndex, directionIndex, shouldTeleport, forwardMode, drunk, nextIdx, map);
            obstacleAgain = res.obstacleAgain;
        }
        // console.log("movePossibility", res.responseResolveOutput);
        
        return res.responseResolveOutput;
    }
    // Indep. Fn
    const setDirectionIndex = (exp = " ", currentPositionIndex = 0, directionIndex = 0, shouldTeleport = false, forwardMode = true, drunk = false, nextIdx = 0, map: string[]) => {
        let step = STEP_FORWARD;
        let responseResolveOutput = {
            currentPositionIndex,
            context: { headTo: 'SOUTH', step: 5, modifier: moveToSouth },
            directionIndex, 
            shouldTeleport, 
            forwardMode,   
            drunk,
            map
        }
        // console.log("setDirectionIndex", currentPositionIndex);

        if(forwardMode) {
            return responseResolveOutput = movePossibility(exp, currentPositionIndex, directionIndex, shouldTeleport, forwardMode, drunk, nextIdx, map, step);
        }
        step = STEP_BACKWARD;
        return responseResolveOutput = movePossibility(exp, currentPositionIndex, directionIndex, shouldTeleport, forwardMode, drunk, nextIdx, map, step);
    }

    const handleTeleporting = (currentPositionIndex: number, map: string[]) => {

        // In fact, a native loop is faster on chrome that using indexOf
        // console.log("before", currentPositionIndex);
        let teleportToIndex: number = 0;
        for(let idx = 0; idx < map.length; idx++) {
            if(map[idx] === TELEPORTER_TAG && idx !== currentPositionIndex)
                teleportToIndex = idx
        }
        // console.log("teleportToIndex", teleportToIndex);

        const shouldTeleport = false;
        // return false
        return {shouldTeleport, currentPositionIndex: teleportToIndex};
    }
    return { handleContext, handleTeleporting, directions };
}

// MUST RETURN LOT OF THINGS