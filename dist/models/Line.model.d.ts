import { Point } from "./Point.model";
interface IParametric {
    c: number;
    t: number;
}
interface IOptions {
    colour: string;
    thickness: number;
    id?: string;
    ignore: boolean;
}
export declare class Line {
    start: Point;
    end: Point;
    parametric: {
        x: IParametric;
        y: IParametric;
        z: IParametric;
    };
    distance: number;
    colour: string;
    thickness: number;
    id?: string;
    ignore: boolean;
    constructor(start: Point, end: Point, options?: IOptions);
}
export {};
