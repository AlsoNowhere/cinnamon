import { getDistance2D } from "../services/get-distance.service";

export const Line2D = function (x1, y1, x2, y2) {
  this.x1 = x1;
  this.y1 = y1;
  this.x2 = x2;
  this.y2 = y2;
  this.gradient = (y2 - y1) / (x2 - x1);
  this.gradient =
    this.gradient === Infinity
      ? 1_000_000
      : this.gradient === -Infinity
      ? -1_000_000
      : this.gradient;
  this.intersect = y1 - this.gradient * x1;
  this.distance = getDistance2D({ x: x1, y: y1 }, { x: x2, y: y2 });

  Object.freeze(this);
};
