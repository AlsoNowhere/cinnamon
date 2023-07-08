import { getDistance3D } from "./get-distance.service";

import { Point } from "../models/Point.model";

export const getClosest = (points: Array<Point>, point: Point): Point => {
  const [closest] = points.sort(
    (a, b) => getDistance3D(a, point) - getDistance3D(b, point)
  );

  return closest;
};
