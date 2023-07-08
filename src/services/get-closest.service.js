import { getDistance3D } from "./get-distance.service";

export const getClosest = (points, point) => {
  const [closest] = points.sort(
    (a, b) => getDistance3D(a, point) - getDistance3D(b, point)
  );

  return closest;
};
