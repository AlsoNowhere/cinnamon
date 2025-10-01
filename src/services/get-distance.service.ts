import { Point } from "../models/Point.model";
import { Point2D } from "../models/Point2D.model";

export const getDistance3D = (a: Point, b: Point): number =>
  Math.pow(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2) + Math.pow(b.z - a.z, 2), 1 / 2);

export const getDistance2D = (a: Point2D, b: Point2D): number =>
  Math.pow(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2), 1 / 2);
