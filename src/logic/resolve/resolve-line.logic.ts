import { Cinnamon } from "../../main/Cinnamon";

import { isPointInView } from "../../services/is-point-in-view.service";
import { getClosest } from "../../services/get-closest.service";
import { getDistance3D } from "../../services/get-distance.service";
import { isPointOnLine } from "../../services/is-point-on-line.service";

import { getIntersects } from "../get-intersects.logic";

import { Point } from "../../models/Point.model";
import { Line } from "../../models/Line.model";

import { IResolvedPoint } from "../../interfaces/IResolvedPoint.interface";

import { TLine } from "../../types/TLine.type";

const inversePlanes = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right",
};

export const resolveLine = function (
  line: Line,
  showResolved = false
): TLine | null {
  const cinnamon = this as Cinnamon;

  let start: Point | IResolvedPoint | null = line.start;
  let end: Point | IResolvedPoint | null = line.end;

  const [startInView, endInView] = [start, end].map((x) =>
    isPointInView.apply(cinnamon, [x])
  ) as [boolean, boolean];

  if (startInView && endInView) {
    start = cinnamon.getDimensions(start, true);
    end = cinnamon.getDimensions(end, true);

    if (start === null || end === null) return null;
    start;
    return showResolved
      ? {
          start: { resolvedPoint: start, point: line.start, startInView },
          end: { resolvedPoint: end, point: line.end, endInView },
          inView: 2,
        }
      : { start, end, inView: 2 };
  }

  const {
    intersects,
    filteredIntersects,
  }: {
    intersects: Record<string, Point>;
    filteredIntersects: Array<{ key: string; value: Point }>;
  } = getIntersects.apply(cinnamon, [line]);

  const sortedIntersects = Object.entries(intersects)
    .map(([key, value]) => ({ key, value }))
    .filter(({ value }) => isPointOnLine(value, line))
    .sort(
      (a, b) =>
        getDistance3D(a.value, start as Point) -
        getDistance3D(b.value, start as Point)
    )
    .map(({ key, value }) => ({
      key,
      value,
      inView: isPointInView.apply(cinnamon, [value]),
      direction:
        !isPointInView.apply(cinnamon, [value]) &&
        (key === "top" || key === "bottom"
          ? value.x < 0
            ? "left"
            : "right"
          : value.y < 0
          ? "bottom"
          : "top"),
    }))
    .map((x) =>
      x.value.z >= 0
        ? x
        : {
            key: (inversePlanes as any)[x.key],
            value: x.value,
            inView: x.inView,
            direction: x.direction,
          }
    );

  if (!startInView && !endInView) {
    if (filteredIntersects.length === 0)
      return showResolved
        ? { output: null, intersects: sortedIntersects }
        : null;

    const validIntersects = filteredIntersects.filter(({ value }) => {
      return isPointInView.apply(cinnamon, [value]);
    });

    if (validIntersects.length !== 2)
      return showResolved
        ? { output: null, intersects: sortedIntersects }
        : null;

    const [_a, _b] = validIntersects.sort(
      (a, b) =>
        getDistance3D(a.value, start as Point) -
        getDistance3D(b.value, start as Point)
    );
    const [a, b] = [_a, _b].map(({ value }) =>
      cinnamon.getDimensions(value, true)
    );
    start = a as IResolvedPoint;
    end = b as IResolvedPoint;
    const inverse = _a !== validIntersects[0];
    return showResolved
      ? {
          start: {
            resolvedPoint: start as IResolvedPoint,
            point: inverse ? _b : _a,
            startInView,
          },
          end: {
            resolvedPoint: end as IResolvedPoint,
            point: inverse ? _a : _b,
            endInView,
          },
          inView: 0,
          intersects: sortedIntersects,
        }
      : { start, end, inView: 0 };
  }

  if (filteredIntersects.length === 0) {
    return null;
  }

  const intersectPoints = filteredIntersects.map(({ value }) => value);

  if (startInView) {
    const closest = getClosest(intersectPoints, start);
    const { key } = filteredIntersects.find(
      ({ value }) => value === closest
    ) as { key: string; value: Point };
    start = cinnamon.getDimensions(start, true) as IResolvedPoint;
    end = cinnamon.getDimensions(closest, true) as IResolvedPoint;
    return showResolved
      ? {
          start: {
            resolvedPoint: start,
            point: line.start,
            startInView,
          },
          end: { resolvedPoint: end, point: closest, plane: key },
          inView: 1,
          intersects: sortedIntersects,
        }
      : { start, end, inView: 1 };
  } else {
    const closest = getClosest(intersectPoints, end);
    const { key } = filteredIntersects.find(
      ({ value }) => value === closest
    ) as { key: string; value: Point };
    start = cinnamon.getDimensions(closest, true) as IResolvedPoint;
    end = cinnamon.getDimensions(end, true) as IResolvedPoint;
    return showResolved
      ? {
          start: { resolvedPoint: start, point: closest, plane: key },
          end: { resolvedPoint: end, point: line.end, endInView },
          inView: 1,
          intersects: sortedIntersects,
        }
      : { start, end, inView: 1 };
  }
};
