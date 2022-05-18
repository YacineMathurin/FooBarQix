/**  Obstacle tag in the city symbolised by X */
export const OBSTACLE_TAG: string = "X";
/**  Border tag of the city symbolised by # */
export const BORDER_TAG: string = "#";
/**  The bot's starting position tag symbolised by # */
export const POSITION_TAG: string = "@";
/** Beer tag symbolised by B */
export const BEER_TAG: string = "B";
/** Inverter tag symbolised by I */
export const INVERTER_TAG: string = "I";
/** Teleporter tag symbolised by T */
export const TELEPORTER_TAG: string = "T";
/** Gave over tag symbolised by $ */
export const GAMEOVER_TAG: string = "$";
/** Head to south tag symbolised by S */
export const SOUTH_TAG: string = "S";
/** Head to east tag symbolised by E */
export const EAST_TAG: string = "E";
/** Head to north tag symbolised by N */
export const NORTH_TAG: string = "N";
/** Head to west tag symbolised by W */
export const WEST_TAG: string = "W";
/** Returned value is case of infinite loop */
export const LOOP_CASE: string = "LOOP";
/** Step for directions array in forward mode  */
export const STEP_FORWARD: number = 1;
/** Step for directions array in backward mode  */
export const STEP_BACKWARD: number = -1;
/** Number of cycles to looping */
export const CYCLES_TO_LOOP: number = 7;
/** Forward mode priority starting point and going forward */
export const FORWARD_MODE_PRIORITY = 0;
/** Backward mode priority starting point and going backward */
export const BACKWARD_MODE_PRIORITY = -1;
/** Type of the list of Directions */
export interface Context {
    headTo: string,
    step: number,
    modifier: (currentPositionIndex: number) => number
}
/** Type of response from handleContext  */
export interface IRespContext {
    currentPositionIndex: number,
    context: Context,
    directionIndex: number, 
    shouldTeleport: boolean, 
    forwardMode: boolean, 
    drunk: boolean, 
    map: string[]
}
export interface IResponseResolveOutput {
    currentPositionIndex: number,
    context: Context
}
export interface IResponseResolveOutputObstacles {
    currentPositionIndex: number,
    context: Context,
    directionIndex: number, 
    shouldTeleport: boolean, 
    forwardMode: boolean,   
    drunk: boolean,
    map: string[]
}
export interface IResp {
    obstacleAgain: boolean,
    responseResolveOutput: IResponseResolveOutputObstacles
};
export interface IResponseHandleObstacles {
    responseResolveOutput: IResponseResolveOutput,
    directionIndex: number,
    shouldTeleport: boolean,
    forwardMode: boolean,
    drunk: boolean,
    map: string[]
}