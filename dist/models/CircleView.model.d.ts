import { Direction } from "./Direction.model";
import { Point } from "./Point.model";
export declare class CircleView {
    centre: Point;
    distance: number;
    direction: Direction;
    constructor(centre?: Point, distance?: number);
    getCinnamonCentre(): Point;
}
