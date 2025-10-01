import { Point } from "../models/Point.model";
import { IResolvedPoint } from "../interfaces/IResolvedPoint.interface";
export declare const getDimensions: (point: Point, forceResolve?: boolean) => IResolvedPoint | null;
