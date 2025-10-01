import { Point } from "./Point.model";
interface IOptions {
    colour?: string;
    id?: string;
    attributes?: Record<string, string>;
}
export declare class Polygon {
    points: Array<Point>;
    centre: Point;
    colour: string;
    id?: string;
    attributes?: Record<string, string>;
    constructor(points: Array<Point>, options?: IOptions);
    clone({ points: _points, ...rest }?: {
        points?: Array<Point>;
    } & IOptions): Polygon;
}
export {};
