import { Point } from "../models/Point.model";

export interface IIntersect {
  key: any;
  value: Point;
  inView: any;
  direction: string | false;
}
