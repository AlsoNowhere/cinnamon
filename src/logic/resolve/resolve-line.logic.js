import { isPointInView } from "../../services/is-point-in-view.service";
import { getClosest } from "../../services/get-closest.service";
import { round } from "../../services/round.service";
import { getDistance3D } from "../../services/get-distance.service";

import { getIntersects } from "../get-intersects.logic";

import { RADIANS } from "../../data/RADIANS.data";
import { isPointOnLine } from "../../services/is-point-on-line.service";

const inversePlanes = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right",
};

export const resolveLine = function (line, showResolved = false) {
  let { start, end } = line;

  const [startInView, endInView] = [start, end].map((x) =>
    isPointInView.apply(this, [x])
  );

  if (startInView && endInView) {
    start = this.getDimensions(start, true);
    end = this.getDimensions(end, true);

    return showResolved
      ? {
          start: { resolvedPoint: start, point: line.start, startInView },
          end: { resolvedPoint: end, point: line.end, endInView },
          inView: 2,
        }
      : { start, end, inView: 2 };
  }

  const { intersects, filteredIntersects } = getIntersects.apply(this, [line]);

  const sortedIntersects = Object.entries(intersects)
    .map(([key, value]) => ({ key, value }))
    .filter(({ value }) => isPointOnLine(value, line))
    // const sortedIntersects = filteredIntersects
    .sort(
      (a, b) => getDistance3D(a.value, start) - getDistance3D(b.value, start)
    )
    .map(({ key, value }) => ({
      key,
      value,
      inView: isPointInView.apply(this, [value]),
      direction:
        !isPointInView.apply(this, [value]) &&
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
            key: inversePlanes[x.key],
            value: x.value,
            inView: x.inView,
            // direction: inversePlanes[x.direction],
            direction: x.direction,
          }
    );

  if (!startInView && !endInView) {
    if (filteredIntersects.length === 0)
      return showResolved
        ? { output: null, intersects: sortedIntersects }
        : null;

    const validIntersects = filteredIntersects.filter(({ value }) => {
      // const { x, y, z } = value;
      // const angleZX = round(Math.atan(x / z) * RADIANS);
      // const angleY = round(Math.atan(y / z) * RADIANS);

      // console.log("In view: ", isPointInView.apply(this, [value]));

      // return (
      //   angleZX <= this.aperture.zx &&
      //   angleZX >= -this.aperture.zx &&
      //   angleY <= this.aperture.y &&
      //   angleY >= -this.aperture.y
      // );

      return isPointInView.apply(this, [value]);
    });

    // console.log("Valid: ", validIntersects);

    if (validIntersects.length !== 2)
      return showResolved
        ? { output: null, intersects: sortedIntersects }
        : null;

    const [_a, _b] = validIntersects.sort(
      (a, b) => getDistance3D(a.value, start) - getDistance3D(b.value, start)
    );
    const [a, b] = [_a, _b].map(({ value }) => this.getDimensions(value, true));
    start = a;
    end = b;
    const inverse = _a !== validIntersects[0];
    return showResolved
      ? {
          start: {
            resolvedPoint: start,
            point: inverse ? _b : _a,
            startInView,
          },
          end: {
            resolvedPoint: end,
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
    const { key } = filteredIntersects.find(({ value }) => value === closest);
    start = this.getDimensions(start, true);
    end = this.getDimensions(closest, true);
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
    const { key } = filteredIntersects.find(({ value }) => value === closest);
    start = this.getDimensions(closest, true);
    end = this.getDimensions(end, true);
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
