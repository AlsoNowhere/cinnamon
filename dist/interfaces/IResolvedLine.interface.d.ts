import { Line } from "../models/Line.model";
import { IResolvedPoint } from "./IResolvedPoint.interface";
export interface IResolvedLine {
    start: IResolvedPoint;
    end: IResolvedPoint;
    line: Line;
}
