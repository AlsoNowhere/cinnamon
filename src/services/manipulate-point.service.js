import { getDistance2D } from "./get-distance.service";
import { round } from "./round.service";

import { Point } from "../models/Point.model";

import { RADIANS } from "../data/RADIANS.data";

const getAngle = (a, b) => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const angle = Math.atan(dx / dy) * RADIANS;
  return round(angle);
};

const getXY = (angle, distance, inverse = false) => {
  const x = round(Math.sin(angle / RADIANS) * distance);
  let y = round(Math.cos(angle / RADIANS) * distance);
  if (angle === 0 && inverse) y *= -1;
  return { x, y };
};

export const manipulatePoint = (centre, direction, { x, y, z }) => {
  x -= centre.x;
  y -= centre.y;
  z -= centre.z;

  {
    const point2D = { x, y: z };
    let angle = getAngle({ x: 0, y: 0 }, point2D);
    if (isNaN(angle)) angle = 0;
    if (x < 0 && z < 0) angle = -180 + angle;
    if (x > 0 && z < 0) angle = 180 + angle;
    angle = angle - (direction.zx > 180 ? direction.zx - 360 : direction.zx);
    const distance2D = getDistance2D({ x: 0, y: 0 }, point2D);
    const { x: newX, y: newZ } = getXY(angle, distance2D);

    x = newX;
    z = newZ;
  }
  {
    const point2D = { x: z, y };
    let angle = getAngle({ x: 0, y: 0 }, point2D);
    if (isNaN(angle)) angle = 0;
    if (z > 0 && y < 0) angle += 180;
    if (z < 0 && y < 0) angle = -180 + angle;
    angle = angle - direction.y;
    const distance2D = getDistance2D({ x: 0, y: 0 }, point2D);
    const { x: newZ, y: newY } = getXY(angle, distance2D, y < 0);
    z = newZ;
    y = newY;
  }

  return new Point(round(x), round(y), round(z));
};

const reverse = (centre, direction, { x, y, z, ...rest }) => {
  const _zx = -direction.zx;
  const _y = -direction.y;

  {
    const point2D = { x: z, y };
    let angle = getAngle({ x: 0, y: 0 }, point2D);
    if (isNaN(angle)) angle = 0;
    if (z > 0 && y < 0) angle += 180;
    if (z < 0 && y < 0) angle = -180 + angle;
    angle = angle - _y;
    const distance2D = getDistance2D({ x: 0, y: 0 }, point2D);
    const { x: newZ, y: newY } = getXY(angle, distance2D, y < 0);
    z = newZ;
    y = newY;
  }

  {
    const point2D = { x, y: z };
    let angle = getAngle({ x: 0, y: 0 }, point2D);
    if (isNaN(angle)) angle = 0;
    if (x < 0 && z < 0) angle = -180 + angle;
    if (x > 0 && z < 0) angle = 180 + angle;
    angle = angle - (_zx > 180 ? _zx - 360 : _zx);
    const distance2D = getDistance2D({ x: 0, y: 0 }, point2D);
    const { x: newX, y: newZ } = getXY(angle, distance2D);

    x = newX;
    z = newZ;
  }

  x += centre.x;
  y += centre.y;
  z += centre.z;

  return new Point(round(x), round(y), round(z), { ...rest });
};

manipulatePoint.reverse = reverse;
