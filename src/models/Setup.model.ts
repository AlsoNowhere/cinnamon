import { Point } from "./Point.model";
import { Direction } from "./Direction.model";

export class Setup {
  centre: Point;
  direction: Direction;
  baseAperture: number;

  constructor(centre = new Point(0, 0, 0), direction = new Direction(), baseAperture = 30) {
    this.centre = centre;
    this.direction = direction;
    this.baseAperture = baseAperture;
  }
}
