import { isPointOnLine2D } from "./is-point-on-line.service";

import { Point2D } from "../models/Point2D.model";
import { Line2D } from "../models/Line2D.model";

export const intersectLines2D = (lineA: Line2D, lineB: Line2D): Point2D | null => {
  // ** m1x + c1 = m2x + c2
  let x = (lineB.intersect - lineA.intersect) / (lineA.gradient - lineB.gradient);
  const _x = x;

  x = Math.round(x * 1e8) / 1e8;

  // ** ym2 - ym1 = c1m2 - c2m1
  let y = (lineA.intersect * lineB.gradient - lineB.intersect * lineA.gradient) / (lineB.gradient - lineA.gradient);
  const _y = y;

  y = Math.round(y * 1e8) / 1e8;

  if (!isPointOnLine2D({ x, y }, lineA) || !isPointOnLine2D({ x, y }, lineB)) {
    return null;
  }

  return new Point2D(x, y);
};
