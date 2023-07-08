import { infinity } from "../data/constants.data";
import { getDistance2D } from "../services/get-distance.service";

import { Point2D } from "./Point2D.model";

export class Line2D {
  x1: number;
  y1: number;
  x2: number;
  y2: number;

  gradient: number;
  intersect: number;
  distance: number;

  constructor(point1: Point2D, point2: Point2D) {
    let [x1, y1, x2, y2] = [point1.x, point1.y, point2.x, point2.y];

    [x1, y1, x2, y2] = [x1, y1, x2, y2].map((x) =>
      x === Infinity ? infinity : x === -Infinity ? -infinity : x
    );

    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;

    {
      const gradient = (y2 - y1) / (x2 - x1);
      this.gradient =
        gradient === Infinity
          ? infinity
          : gradient === -Infinity
          ? -infinity
          : gradient;
    }

    this.intersect = y1 - this.gradient * x1;
    this.distance = getDistance2D({ x: x1, y: y1 }, { x: x2, y: y2 });
  }
}
