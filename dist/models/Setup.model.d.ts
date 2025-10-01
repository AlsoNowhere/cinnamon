import { Point } from "./Point.model";
import { Direction } from "./Direction.model";
export declare class Setup {
    centre: Point;
    direction: Direction;
    baseAperture: number;
    constructor(centre?: Point, direction?: Direction, baseAperture?: number);
}
