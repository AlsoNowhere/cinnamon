import { Point } from "../models/Point.model";
import { Line } from "../models/Line.model";
export declare const getIntersects: (line: Line) => {
    intersects: Record<string, Point>;
    crossIntersects: Record<string, Point>;
    filteredIntersects: {
        key: string;
        value: Point;
    }[];
};
