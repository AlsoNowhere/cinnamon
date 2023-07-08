import { Cinnamon } from "../main/Cinnamon";

import { getPlaneLineIntersection } from "../services/get-plane-line-intersect.service";
import { isPointOnLine } from "../services/is-point-on-line.service";

import { Point } from "../models/Point.model";
import { Line } from "../models/Line.model";

export const getIntersects = function (line: Line) {
  const cinnamon = this as Cinnamon;
  const intersects: Record<string, Point> = {};
  const crossIntersects: Record<string, Point> = {};

  for (let plane in cinnamon.planes) {
    const value = cinnamon.planes[plane];
    const intersect = getPlaneLineIntersection(value, line);
    intersects[plane] = intersect;

    if (intersect.valid) {
      const hori = plane;
      const vert = intersect.y < cinnamon.centre.y ? "bottom" : "top";
      crossIntersects[`${hori}-${vert}`] = intersect;
    }
  }

  const filteredIntersects = Object.entries(intersects)
    .map(([key, value]) => ({ key, value }))
    .filter(({ value }) => value.z >= 0 && isPointOnLine(value, line));

  return { intersects, crossIntersects, filteredIntersects };
};
