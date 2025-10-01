import { getDistance2D } from "./get-distance.service";

import { Point } from "../models/Point.model";
import { Point2D } from "../models/Point2D.model";
import { Direction } from "../models/Direction.model";

import { RADIANS } from "../data/RADIANS.data";

const getAngle = (a: Point2D, b: Point2D) => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const angle = Math.atan(dx / dy) * RADIANS;
  return angle;
};

const getXY = (angle: number, distance: number, inverse = false) => {
  const x = Math.sin(angle / RADIANS) * distance;
  let y = Math.cos(angle / RADIANS) * distance;
  if (angle === 0 && inverse) y *= -1;
  return { x, y };
};

export const manipulatePoint = (centre: Point, direction: Direction, point: Point) => {
  let { x, y, z } = point;
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

  return new Point(x, y, z);
};

const reverse = (centre: Point, direction: Direction, point: Point): Point => {
  let { x, y, z, ...rest } = point;
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

  return new Point(x, y, z, { ...rest });
};

manipulatePoint.reverse = reverse;
