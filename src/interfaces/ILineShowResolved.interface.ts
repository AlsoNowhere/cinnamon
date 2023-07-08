import { Point } from "../models/Point.model";

import { IIntersect } from "./IIntersect.interface";
import { IResolvedPoint } from "./IResolvedPoint.interface";

export interface ILineShowResolved {
  resolvedPoint: IResolvedPoint;
  point?: Point | IIntersect | { key: string; value: Point };
}
