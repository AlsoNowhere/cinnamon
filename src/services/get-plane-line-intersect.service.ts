import { Point } from "../models/Point.model";
import { Line } from "../models/Line.model";
import { Plane } from "../models/Plane.model";

import { infinity } from "../data/constants.data";

export const getPlaneLineIntersection = (plane: Plane, line: Line): Point => {
  let t =
    (plane.d -
      plane.x * line.parametric.x.c -
      plane.y * line.parametric.y.c -
      plane.z * line.parametric.z.c) /
    (plane.x * line.parametric.x.t +
      plane.y * line.parametric.y.t +
      plane.z * line.parametric.z.t);

  if (t === Infinity) {
    t = infinity;
  }

  return new Point(
    line.parametric.x.c + t * line.parametric.x.t,
    line.parametric.y.c + t * line.parametric.y.t,
    line.parametric.z.c + t * line.parametric.z.t
  );
};
