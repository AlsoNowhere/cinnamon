import { Point } from "../models/Point.model";

import { RADIANS } from "../data/RADIANS.data";

const buffer = 0.000_000_000_001;

export const isPointInView = function (point: Point): boolean {
  const { x, y, z } = point;

  if (z < 0) return false;
  const angleZX = Math.atan(x / z) * RADIANS;
  const angleY = Math.atan(y / z) * RADIANS;

  if (
    angleZX <= -this.aperture.zx - buffer ||
    angleZX >= this.aperture.zx + buffer
  )
    return false;
  if (angleY <= -this.aperture.y - buffer || angleY >= this.aperture.y + buffer)
    return false;
  return true;
};
