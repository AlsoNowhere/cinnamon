/*
    Does not check is point completes the line equation, it assumes that it does.
    Checks if the point is between the start and end.

    --start-------POINT-------end--
    The above would return true.

    --POINT----start-------end--
    The above would return false.
*/

import { getDistance2D, getDistance3D } from "./get-distance.service";

import { Point } from "../models/Point.model";
import { Line } from "../models/Line.model";
import { Point2D } from "../models/Point2D.model";
import { Line2D } from "../models/Line2D.model";

export const isPointOnLine = (point: Point, line: Line): boolean => {
  const distanceToStart = getDistance3D(point, line.start);
  const distanceToEnd = getDistance3D(point, line.end);

  return distanceToStart <= line.distance && distanceToEnd <= line.distance;
};

export const isPointOnLine2D = (point: Point2D, line: Line2D): boolean => {
  let { x1, y1, x2, y2, distance } = line;
  const distanceToStart = getDistance2D(point, new Point2D(x1, y1));
  const distanceToEnd = getDistance2D(point, new Point2D(x2, y2));

  return distanceToStart <= distance && distanceToEnd <= distance;
};
