import * as Const from "./constants";
import { startup } from "./startup";
import { functions } from "./functions";
const { GAMEOVER_TAG, POSITION_TAG, LOOP_CASE } = Const;

export function app(filename: string) {
    const { handleTeleporting, handleContext, directions } = functions(filename);   
    let { map } = startup(filename);
    const startPositionIndex: number = map.indexOf(POSITION_TAG);
    const gameoverPositionIndex: number = map.indexOf(GAMEOVER_TAG);
    let currentPositionIndex: number = map.indexOf(POSITION_TAG);

    let nextIdx: number = 0;
    let directionIndex: number = 0;

    let forwardMode: boolean = true;
    let drunk:  boolean = false;
    let shouldTeleport:  boolean = false;
    let processing:  boolean = true;
    let isLooped:  boolean | undefined;
    let context = directions[directionIndex];
    let outputList: string[] = [];
    let arrayCurrentPositionIndex: number[] = [];

    const storeCurrentPositionIndex = (currentPositionIndex: number) => {
        let count = 0;
        arrayCurrentPositionIndex.push(currentPositionIndex);

        arrayCurrentPositionIndex.map(item => {
            if (item == startPositionIndex) {
                count += 1;
                return 0;
            }
            return 0;
        });
        if(count === 3) {
            isLooped = true;
        }  
    }
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
        // console.log("newDirectionIndex", newContext, "forwardMode", newForwardMode);

        currentPositionIndex = newCurrentPositionIndex
        context = newContext
        directionIndex = newDirectionIndex
        shouldTeleport = newShouldTeleport
        forwardMode = newForwardMode
        drunk = newDrunk
        map = newMap

        outputList.push(newContext.headTo);
        if (gameoverPositionIndex == newCurrentPositionIndex) {
            // Blunder died, tell its story
            isLooped = false;
        }
        storeCurrentPositionIndex(newCurrentPositionIndex);

    }
    storeCurrentPositionIndex(startPositionIndex);
    // We dectect the tag symbol at next step then move accordingly
    const main = () => { 

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

    while(map[currentPositionIndex] !== GAMEOVER_TAG && isLooped === undefined) main() 
    
    if (isLooped) { 
        return LOOP_CASE;
    } else {
        return outputList;
    }
}

console.log(app("file.txt")); 