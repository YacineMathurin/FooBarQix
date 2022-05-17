import * as Const from "./constants";
import { startup } from "./startup";
import { functions } from "./functions";
const { GAMEOVER_TAG, POSITION_TAG, LOOP_CASE } = Const;
const fs = require('fs');

const content = 'Some content!';

export function App(filename: string) {
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

        for(let i = 0; i < arrayCurrentPositionIndex.length; i++) {
            let count = 0;
            for(let j = 0; j < arrayCurrentPositionIndex.length; j++) {
                if(arrayCurrentPositionIndex[i] === arrayCurrentPositionIndex[j]) count += 1;
            }
            if(count === 7) {
                isLooped = true;
                break;
            }   
        }

        // arrayCurrentPositionIndex.map(item => {
        //     if (item == startPositionIndex) {
        //         count += 1;
        //         return 0;
        //     }
        //     return 0;
        // });
        // if(count === 3) {
        //     isLooped = true;
        // }  
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
        if(directionIndex >= 0)
            context = directions[directionIndex  % directions.length];
        else
            context = directions[(directions.length - (Math.abs(directionIndex)  % directions.length)) % directions.length];


        nextIdx = currentPositionIndex + context["step"];
        
        const res = handleContext(map[nextIdx], currentPositionIndex, directionIndex, shouldTeleport, forwardMode, drunk, nextIdx, map);
        
        if(res)
            setState(res);
        // console.log(outputList);
    }

    while(map[currentPositionIndex] !== GAMEOVER_TAG && isLooped === undefined) main() 
    // for (let index = 0; index < 27; index++) main();
    if (isLooped) { 
        return LOOP_CASE;
    } else {
        // fs.writeFile('Huge res.txt', JSON.stringify(outputList), (err:any) => {}); 
        return outputList;
        
    }
}

// Failed
console.log(App("Multiple loops.txt"));
 
// console.log(App("Loop.txt"));   