import { Point } from "../models/Point.model";
import { Line } from "../models/Line.model";
import { Plane } from "../models/Plane.model";

import { infinity } from "../data/constants.data";

export const getPlaneLineIntersection = (plane: Plane, line: Line): Point => {
  const { x, y, z, d } = plane;
  const para = line.parametric;

  const _c = d * -1 - (x * para.x.c + y * para.y.c + z * para.z.c);
  const _t = x * para.x.t + y * para.y.t + z * para.z.t;

  let t = _c / _t;

  if (t === Infinity) {
    t = infinity;
  }

  if (t === -Infinity) {
    t = -infinity;
  }

  return new Point(para.x.c + t * para.x.t, para.y.c + t * para.y.t, para.z.c + t * para.z.t);
};
