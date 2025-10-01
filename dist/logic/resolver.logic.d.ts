import { Point } from "../models/Point.model";
import { Line } from "../models/Line.model";
import { Polygon } from "../models/Polygon.model";
import { IResolvedPoint } from "../interfaces/IResolvedPoint.interface";
export interface IOptions {
    points?: Array<Point>;
    lines?: Array<Line>;
    polygons?: Array<Polygon>;
    renderClosestLast?: boolean;
}
export declare const resolver: (options?: IOptions) => {
    polygons: {
        polygon: Polygon;
        points: IResolvedPoint[];
    }[];
    lines: {
        line: Line;
        start: any;
        end: any;
    }[];
    points: (IResolvedPoint & {
        absolute: number;
    })[];
};
