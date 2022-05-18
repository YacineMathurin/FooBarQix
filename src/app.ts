import * as Const from "./constants";
import { startup } from "./startup";
import { functions } from "./functions";
const { GAMEOVER_TAG, POSITION_TAG, LOOP_CASE, CYCLES_TO_LOOP } = Const;
 
export function App(filename: string) {  
    const { handleTeleporting, handleContext, getContext, directions } = functions(filename);   
    let { map } = startup(filename);
    const gameoverPositionIndex: number = map.indexOf(GAMEOVER_TAG);
    let currentPositionIndex: number = map.indexOf(POSITION_TAG);

    let nextIdx: number = 0;
    let directionIndex: number = 0;

    let forwardMode: boolean = true;
    let drunk:  boolean = false;
    let shouldTeleport:  boolean = false;
    let isLooped:  boolean | undefined;
    let context = directions[directionIndex];
    let outputList: string[] = [];
    let arrayCurrentPositionIndex: number[] = [];

    const storeCurrentPositionIndex = (currentPositionIndex: number) => {
        arrayCurrentPositionIndex.push(currentPositionIndex);
        /** After  CYCLES_TO_LOOP occurence of a currentPositionIndex, we are in a loop case */
        for(let i = 0; i < arrayCurrentPositionIndex.length; i++) {
            let count = 0;
            for(let j = 0; j < arrayCurrentPositionIndex.length; j++) {
                if(arrayCurrentPositionIndex[i] === arrayCurrentPositionIndex[j]) count += 1;
            }
            if(count === CYCLES_TO_LOOP) {
                isLooped = true;
                break;
            }   
        }
    }
    const setState = ({ 
            currentPositionIndex: newCurrentPositionIndex,
            context: newContext,
            directionIndex: newDirectionIndex, 
            shouldTeleport: newShouldTeleport, 
            forwardMode: newForwardMode,   
            drunk: newDrunk,
            map: newMap}: Const.IRespContext) => 
        {

        currentPositionIndex = newCurrentPositionIndex
        context = newContext
        directionIndex = newDirectionIndex
        shouldTeleport = newShouldTeleport
        forwardMode = newForwardMode
        drunk = newDrunk
        map = newMap

        outputList.push(newContext.headTo);
        
        if (gameoverPositionIndex == newCurrentPositionIndex) {
            /** Blunder died, tell its story */
            isLooped = false;
        }
        storeCurrentPositionIndex(newCurrentPositionIndex);
    }
    /** We dectect the tag symbol at next step then move accordingly */ 
    const main = () => {

        if(shouldTeleport) { 
            const {shouldTeleport: resShouldTeleport, currentPositionIndex: respCurrentPositionIndex} = handleTeleporting(currentPositionIndex, map);
            shouldTeleport = resShouldTeleport;
            currentPositionIndex = respCurrentPositionIndex;
            return;
        }
        context = getContext(directionIndex);  

        nextIdx = currentPositionIndex + context["step"];
        
        const res = handleContext(map[nextIdx], currentPositionIndex, directionIndex, shouldTeleport, forwardMode, drunk, nextIdx, map);
        
        if(res)
            setState(res);
    }

    while(map[currentPositionIndex] !== GAMEOVER_TAG && isLooped === undefined) main() 
    if (isLooped) { 
        return LOOP_CASE;
    } else {
        return outputList;
    }
}