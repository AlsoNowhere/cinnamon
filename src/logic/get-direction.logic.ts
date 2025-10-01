import { Point } from "../models/Point.model";

import { RADIANS } from "../data/RADIANS.data";

export const getDirection = (pointA: Point, pointB: Point) => {
  const dX = pointB.x - pointA.x;
  const dY = pointB.y - pointA.y;
  const dZ = pointB.z - pointA.z;
  let zx = Math.atan(dX / dZ) * RADIANS;
  if (pointA.z > pointB.z) {
    zx += 180;
  }
  const dZX = Math.pow(Math.pow(dX, 2) + Math.pow(dZ, 2), 1 / 2);
  const y = Math.atan(dY / dZX) * RADIANS;
  return { zx, y };
};
