import { Polygon } from "../models/Polygon.model";

import { IResolvedPoint } from "./IResolvedPoint.interface";

export interface IResolvedPolygon {
  points: Array<IResolvedPoint>;
  polygon: Polygon;
}
