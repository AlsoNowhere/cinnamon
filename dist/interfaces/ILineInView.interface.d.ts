import { IResolvedPoint } from "./IResolvedPoint.interface";
import { TLinePoint } from "../types/TLinePoint.type";
export interface ILineInView {
    start: TLinePoint | IResolvedPoint;
    end: TLinePoint | IResolvedPoint;
    inView: number;
}
