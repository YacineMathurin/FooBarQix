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
    STEP_BACKWARD,
    BACKWARD_MODE_PRIORITY,
    FORWARD_MODE_PRIORITY
} = Const;

export function functions(filename:string) {
    const { colNumbers } = startup(filename);
    const moveToSouth: (currentPositionIndex: number) => number = (currentPositionIndex) =>   currentPositionIndex += directions[0]["step"];
    const moveToEast: (currentPositionIndex: number) => number = (currentPositionIndex) =>  currentPositionIndex += directions[1]["step"]
    const moveToNorth: (currentPositionIndex: number) => number = (currentPositionIndex) => currentPositionIndex += directions[2]["step"];
    const moveToWest: (currentPositionIndex: number) => number = (currentPositionIndex) => currentPositionIndex += directions[3]["step"];
    const directions: Const.Context[] = [
        {headTo: "SOUTH", step: colNumbers, modifier: moveToSouth},
        {headTo: "EAST", step: 1, modifier: moveToEast},
        {headTo: "NORTH", step: -colNumbers, modifier: moveToNorth}, 
        {headTo: "WEST", step: -1, modifier: moveToWest}  
    ];    

    const handleContext = (exp: string, currentPositionIndex: number, directionIndex: number, shouldTeleport: boolean, forwardMode: boolean, drunk: boolean, nextIdx: number, map: string[]): Const.IResponseResolveOutputObstacles => {
        let responseResolveOutput = {currentPositionIndex: 0, context: directions[0]};
        let responseHandleObstacles: Const.IResponseHandleObstacles;
        switch (exp) {
            case SOUTH_TAG:
                /** Get in then set next direction to head to */
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
                    /**  Pass through and the obstacle is destroyed forever */
                    map.splice(nextIdx, 1, " ");
                    responseResolveOutput = resolveOutput(currentPositionIndex, directionIndex);
                    break;
                }
                responseHandleObstacles = handleObstacles(exp, currentPositionIndex, directionIndex, shouldTeleport, forwardMode, drunk, nextIdx, map);
                responseResolveOutput = responseHandleObstacles.responseResolveOutput;
                directionIndex = responseHandleObstacles.directionIndex;
                shouldTeleport = responseHandleObstacles.shouldTeleport;
                forwardMode = responseHandleObstacles.forwardMode;
                drunk = responseHandleObstacles.drunk
                map = responseHandleObstacles.map
                break;
            case BORDER_TAG:
                responseHandleObstacles = handleObstacles(exp, currentPositionIndex, directionIndex, shouldTeleport, forwardMode, drunk, nextIdx, map);
                responseResolveOutput = responseHandleObstacles.responseResolveOutput;
                directionIndex = responseHandleObstacles.directionIndex;
                shouldTeleport = responseHandleObstacles.shouldTeleport;
                forwardMode = responseHandleObstacles.forwardMode;
                drunk = responseHandleObstacles.drunk
                map = responseHandleObstacles.map
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
            map
        }
    }
    const handleObstacles = (exp: string, currentPositionIndex: number, directionIndex: number, shouldTeleport: boolean, forwardMode: boolean, drunk: boolean, nextIdx: number, map: string[]): Const.IResponseHandleObstacles => {
        let responseResolveOutput = {currentPositionIndex: 0, context: directions[0]};
        let responseResolveOutputObstacles: Const.IResponseResolveOutputObstacles;

        if (forwardMode) directionIndex = FORWARD_MODE_PRIORITY;
        else directionIndex = BACKWARD_MODE_PRIORITY; 

        responseResolveOutputObstacles = setDirectionIndex(exp, currentPositionIndex, directionIndex, shouldTeleport, forwardMode, drunk, nextIdx, map);
        
        responseResolveOutput.currentPositionIndex = responseResolveOutputObstacles.currentPositionIndex;
        responseResolveOutput.context = responseResolveOutputObstacles.context;
        directionIndex = responseResolveOutputObstacles.directionIndex
        shouldTeleport = responseResolveOutputObstacles.shouldTeleport
        forwardMode = responseResolveOutputObstacles.forwardMode
        drunk = responseResolveOutputObstacles.drunk
        map = responseResolveOutputObstacles.map
        return {
            responseResolveOutput,
            directionIndex,
            shouldTeleport,
            forwardMode,
            drunk,
            map
        }
    }
    const resolveOutput = (currentPositionIndex: number, directionIndex: number) => {
        let context: Const.Context;
        context = getContext(directionIndex);

        currentPositionIndex = context["modifier"](currentPositionIndex);
        return { currentPositionIndex, context}
    }
    const checkMovePossibility = (exp: string, currentPositionIndex: number, directionIndex: number, shouldTeleport: boolean, forwardMode: boolean, drunk: boolean, nextIdx: number, map: string[]) => {
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
        context = getContext(directionIndex);

        localContext = context["modifier"](currentPositionIndex);
        character = map[localContext]; 

        if (character !== BORDER_TAG && character !== OBSTACLE_TAG ) {
            /** Specify where it gets into instead of obstacle */
            responseResolveOutput = handleContext(character, currentPositionIndex, directionIndex, shouldTeleport, forwardMode, drunk, nextIdx = 0, map)
            res = {obstacleAgain: false, responseResolveOutput};
            return res;
        }
        return {obstacleAgain: true, responseResolveOutput};
    }
    const movePossibility = (exp: string, currentPositionIndex: number, directionIndex: number, shouldTeleport: boolean, forwardMode: boolean, drunk: boolean, nextIdx: number, map: string[], step: number) => {
        let obstacleAgain = true;
        let responseResolveOutput = {
            currentPositionIndex,
            context: { headTo: 'SOUTH', step: colNumbers, modifier: moveToSouth },
            directionIndex, 
            shouldTeleport, 
            forwardMode,   
            drunk, 
            map
        }
        let res = {obstacleAgain: false, responseResolveOutput: responseResolveOutput};
        /** Keep looking for the direction until move is possible */
        while (obstacleAgain) {
            res = checkMovePossibility(exp, currentPositionIndex, directionIndex, shouldTeleport, forwardMode, drunk, nextIdx, map);
            obstacleAgain = res.obstacleAgain;
            if (obstacleAgain) directionIndex += step;
        }
        return res.responseResolveOutput;
    }
    const setDirectionIndex = (exp: string, currentPositionIndex: number, directionIndex: number, shouldTeleport: boolean, forwardMode: boolean, drunk: boolean, nextIdx: number, map: string[]) => {
        let step = STEP_FORWARD;
        let responseResolveOutput: Const.IResponseResolveOutputObstacles;

        if(forwardMode) {
            return responseResolveOutput = movePossibility(exp, currentPositionIndex, directionIndex, shouldTeleport, forwardMode, drunk, nextIdx, map, step);
        }
        step = STEP_BACKWARD;
        return responseResolveOutput = movePossibility(exp, currentPositionIndex, directionIndex, shouldTeleport, forwardMode, drunk, nextIdx, map, step);
    }
    const getContext = (directionIndex: number) => {
        let context: Const.Context;
        if(directionIndex >= 0)
            context = directions[directionIndex  % directions.length];
        else
            context = directions[(directions.length - (Math.abs(directionIndex)  % directions.length)) % directions.length];
        return context;
    }
    const handleTeleporting = (currentPositionIndex: number, map: string[]) => {

        let teleportToIndex: number = 0;
        /** Teleport to the other TELEPORTER_TAG */
        for(let idx = 0; idx < map.length; idx++) {
            if(map[idx] === TELEPORTER_TAG && idx !== currentPositionIndex)
                teleportToIndex = idx
        }

        const shouldTeleport = false;
        return {shouldTeleport, currentPositionIndex: teleportToIndex};
    }
    return { handleContext, handleTeleporting, getContext, directions };
} 