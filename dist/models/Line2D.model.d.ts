import { Point2D } from "./Point2D.model";
export declare class Line2D {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    gradient: number;
    intersect: number;
    distance: number;
    constructor(point1: Point2D, point2: Point2D);
}
