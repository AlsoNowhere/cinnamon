import { Point2D } from "./Point2D.model";

export class Polygon2D {
  points: Array<Point2D>;

  constructor(points: Array<Point2D>) {
    this.points = points;
  }
}
