import { Direction } from "./Direction.model";
import { Point } from "./Point.model";

import { RADIANS } from "../data/RADIANS.data";

export class CircleView {
  centre: Point;
  distance: number;
  direction: Direction;

  constructor(centre = new Point(0, 0, 0), distance = 100) {
    this.centre = centre;
    this.distance = distance;
    this.direction = new Direction(0, 0);
  }

  getCinnamonCentre() {
    const { x, y, z } = this.centre;

    const zx = Math.cos(this.direction.y / RADIANS) * this.distance;

    return new Point(
      Math.sin(this.direction.zx / RADIANS) * -zx + x,
      Math.sin(this.direction.y / RADIANS) * this.distance + y,
      Math.cos(this.direction.zx / RADIANS) * -zx + z,
    );
  }
}
