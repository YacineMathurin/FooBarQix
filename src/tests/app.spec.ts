import { App } from "../app";
import { _ALL_TOGETHER, _BREAKER_MODE, _BROKEN_WALL, _INVERTER, _LOOP, _MULTIPLE_LOOPS, _OBSTACLES, _PATH_MODIFIER, _PRIORITIES, _SIMPLE_MOVE, _STRAIGHT_LINE, _TELEPORT } from "./test.constants";

describe('Testing my App', () => {

    test('Simple moves', () => {
        const filename = "simple-move.txt";
        expect(App(filename)).toStrictEqual(_SIMPLE_MOVE)
    })
    test('Obstacles', () => {
        const filename = "obstacles.txt";
        expect(App(filename)).toStrictEqual(_OBSTACLES)
    })
    test('Priorities', () => {
        const filename = "priorities.txt";
        expect(App(filename)).toStrictEqual(_PRIORITIES)
    })
    test('Straight line', () => {
        const filename = "Straight line.txt";
        expect(App(filename)).toStrictEqual(_STRAIGHT_LINE)
    })
    test('Path modifier', () => {
        const filename = "Path modifier.txt";
        expect(App(filename)).toStrictEqual(_PATH_MODIFIER)
    })
    test('Breaker mode', () => {
        const filename = "Breaker mode.txt";
        expect(App(filename)).toStrictEqual(_BREAKER_MODE)
    })
    test('Inverter', () => {
        const filename = "Inverter.txt";
        expect(App(filename)).toStrictEqual(_INVERTER)
    })
    test('Teleport', () => {
        const filename = "Teleport.txt";
        expect(App(filename)).toStrictEqual(_TELEPORT)
    })
    test('Broken wall', () => {
        const filename = "Broken wall.txt";
        expect(App(filename)).toStrictEqual(_BROKEN_WALL)
    })
    test('All together', () => {
        const filename = "All together.txt";
        expect(App(filename)).toStrictEqual(_ALL_TOGETHER)
    })
    test('Loop', () => {
        const filename = "Loop.txt";
        expect(App(filename)).toStrictEqual(_LOOP)
    })
    test('Multiple loops', () => {
        const filename = "Multiple loops.txt";
        expect(App(filename)).toStrictEqual(_MULTIPLE_LOOPS);
    })
});