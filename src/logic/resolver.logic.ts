import { Cinnamon } from "../main/Cinnamon";

import { manipulatePoint } from "../services/manipulate-point.service";
import { getDistance3D } from "../services/get-distance.service";

import { resolveLine } from "./resolve/resolve-line.logic";
import { resolvePolygon } from "./resolve/resolve-polygon.logic";

import { Point } from "../models/Point.model";
import { Line } from "../models/Line.model";
import { Polygon } from "../models/Polygon.model";

import { IResolvedPoint } from "../interfaces/IResolvedPoint.interface";

export interface IOptions {
  points?: Array<Point>;
  lines?: Array<Line>;
  polygons?: Array<Polygon>;
  renderClosestLast?: boolean;
}

export const resolver = function (options: IOptions = {}) {
  const cinnamon = this as Cinnamon;

  const { points: _points, lines: _lines, polygons: _polygons } = options;
  const renderClosestLast = options.renderClosestLast ?? false;

  //Points
  const points: Array<IResolvedPoint & { absolute: number }> = (
    _points || cinnamon.points
  )
    .map((point) => {
      const { x, y, z } = manipulatePoint(
        cinnamon.centre,
        cinnamon.direction,
        point
      );
      if (z < 0) return null;
      const dimensions = cinnamon.getDimensions(new Point(x, y, z), true);
      if (dimensions === null) return null;
      const { width, height } = dimensions;
      return { width, height, point };
    })
    .filter((point) => point !== null)
    .map((point: IResolvedPoint) => {
      const absolute = getDistance3D(cinnamon.centre, point.point);
      return { ...point, absolute };
    });
  //

  // Lines
  const lines = (_lines || cinnamon.lines)
    .map(({ start, end, ...rest }) =>
      rest.ignore
        ? new Line(start, end, { ...rest })
        : new Line(
            manipulatePoint(cinnamon.centre, cinnamon.direction, start),
            manipulatePoint(cinnamon.centre, cinnamon.direction, end),
            { ...rest }
          )
    )
    .map((line) => {
      const resolvedLine = resolveLine.apply(cinnamon, [line]);
      if (resolvedLine === null) return null;
      const { start, end } = resolvedLine;
      return { line, start, end };
    })
    .filter((line) => line !== null);
  //

  // Polygons
  let polygons = (_polygons || cinnamon.polygons)
    .map(
      ({ points, ...rest }) =>
        new Polygon(
          points.map((x) =>
            manipulatePoint(cinnamon.centre, cinnamon.direction, x)
          ),
          { ...rest }
        )
    )
    .map((polygon) => {
      const points: Array<IResolvedPoint> = resolvePolygon.apply(cinnamon, [
        polygon,
      ]);
      return { polygon, points };
    })
    .filter((polygon) => polygon !== null);

  if (renderClosestLast) {
    polygons = polygons.sort((a, b) => {
      const distanceA = getDistance3D(a.polygon.centre, cinnamon.centre);
      const distanceB = getDistance3D(b.polygon.centre, cinnamon.centre);
      return distanceB - distanceA;
    });
  }
  //

  return { polygons, lines, points };
};
