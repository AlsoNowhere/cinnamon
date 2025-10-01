import { Point } from "../models/Point.model";
import { Direction } from "../models/Direction.model";
export declare const manipulatePoint: {
    (centre: Point, direction: Direction, point: Point): Point;
    reverse: (centre: Point, direction: Direction, point: Point) => Point;
};
