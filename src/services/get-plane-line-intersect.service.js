import { round } from "./round.service";

import { Point } from "../models/Point.model";

export const getPlaneLineIntersection = (plane, line) => {
  let t =
    (plane.d -
      plane.x * line.parametric.x.c -
      plane.y * line.parametric.y.c -
      plane.z * line.parametric.z.c) /
    (plane.x * line.parametric.x.t +
      plane.y * line.parametric.y.t +
      plane.z * line.parametric.z.t);

  if (t === Infinity) {
    // t = 1000000;
  }

  return new Point(
    round(line.parametric.x.c + t * line.parametric.x.t),
    round(line.parametric.y.c + t * line.parametric.y.t),
    round(line.parametric.z.c + t * line.parametric.z.t)
  );
};
