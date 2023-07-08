import { manipulatePoint } from "../../services/manipulate-point.service";
import { getDistance3D } from "../../services/get-distance.service";

import { resolveLine } from "../resolve/resolve-line.logic";
import { resolvePolygon } from "../resolve/resolve-polygon.logic";

import { Point } from "../../models/Point.model";
import { Line } from "../../models/Line.model";
import { Polygon } from "../../models/Polygon.model";

export const renderer = function () {
  //Points
  const points = this.points
    .map((point) => {
      const { x, y, z } = manipulatePoint(this.centre, this.direction, point);
      if (z < 0) return null;
      const { width, height } = this.getDimensions(new Point(x, y, z), true);
      return { ...point, width, height, point };
    })
    .filter((point) => point !== null)
    .map((point) => {
      const absolute = getDistance3D(this.centre, point.point);
      return { ...point, absolute };
    });
  //

  // Lines
  const lines = this.lines
    .map(({ start, end, ...rest }) =>
      rest.ignore
        ? new Line(start, end, { ...rest })
        : new Line(
            manipulatePoint(this.centre, this.direction, start),
            manipulatePoint(this.centre, this.direction, end),
            { ...rest }
          )
    )
    .map((line) => {
      const resolvedLine = resolveLine.apply(this, [line]);
      if (resolvedLine === null) return null;
      const { start, end } = resolvedLine;
      return { ...line, start, end };
    })
    .filter((line) => line !== null);
  //

  // Polygons
  const polygons = this.polygons
    .map(
      ({ points, ...rest }) =>
        new Polygon(
          points.map((x) => manipulatePoint(this.centre, this.direction, x)),
          { ...rest }
        )
    )
    .map((polygon) => {
      const points = resolvePolygon.apply(this, [polygon]);
      return { ...polygon, points };
    })
    .filter((polygon) => polygon !== null);
  //

  return { polygons, lines, points };
};
