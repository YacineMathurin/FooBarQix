/**  Obstacle tag in the city symbolised by X */
export const obstacleTag: string = "X";
/**  Border tag of the city symbolised by # */
export const borderTag: string = "#";
/**  The bot's starting position tag symbolised by # */
export const positionTag: string = "@";
/** Beer tag symbolised by B */
export const beerTag: string = "B";
/** Inverter tag symbolised by I */
export const inverterTag: string = "I";
/** Teleporter tag symbolised by T */
export const teleporterTag: string = "T";
/** Gave over tag symbolised by $ */
export const gameOverTag: string = "$";
/** Head to south tag symbolised by S */
export const southTag: string = "S";
/** Head to east tag symbolised by E */
export const eastTag: string = "E";
/** Head to north tag symbolised by N */
export const northTag: string = "N";
/** Head to west tag symbolised by W */
export const westTag: string = "W";
/** Type of the list of Directions */
export interface Directions {
    headTo: string,
    step: number,
    modifier: () => void
}