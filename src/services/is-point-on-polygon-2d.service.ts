import { intersectLines2D } from "./intersect-lines-2d.service";

import { Point2D } from "../models/Point2D.model";
import { Line2D } from "../models/Line2D.model";
import { Polygon2D } from "../models/Polygon2D.model";

import { infinity } from "../data/constants.data";

export const isPointOnPolygon2D = (point: Point2D, polygon: Polygon2D) => {
  const lineA = new Line2D(point, new Point2D(-infinity, point.y));

  const intersects = polygon.points.map((x, i) => {
    const lineB = new Line2D(
      x,
      polygon.points[i + 1 > polygon.points.length - 1 ? 0 : i + 1]
    );

    return intersectLines2D(lineA, lineB);
  });

  const filteredIntersects = intersects.filter((x) => x !== null);

  return filteredIntersects.length % 2 === 1;
};
