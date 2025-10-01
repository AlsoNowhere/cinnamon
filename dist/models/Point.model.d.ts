import { IResolvedPoint } from "../interfaces/IResolvedPoint.interface";
interface IOptions {
    colour?: string | [string, number];
    size?: number | [number, number];
    id?: string;
    ignore?: boolean;
}
export declare class Point {
    valid: boolean;
    readonly x: number;
    readonly y: number;
    readonly z: number;
    colour: string;
    colourMagnitude?: number;
    size: number;
    sizeMagnitude?: number;
    id?: string;
    ignore: boolean;
    resolvedPoint: IResolvedPoint;
    constructor(x: number, y: number, z: number, options?: IOptions);
    clone({ x: _x, y: _y, z: _z, options: _options, }?: {
        x?: number;
        y?: number;
        z?: number;
        options?: IOptions;
    }): Point;
    matches({ x, y, z }: Point): boolean;
}
export {};
