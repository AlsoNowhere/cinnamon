import { getPlaneLineIntersection } from "../services/get-plane-line-intersect.service";
import { isPointOnLine } from "../services/is-point-on-line.service";

export const getIntersects = function (line) {
  const intersects = {};
  const crossIntersects = {};
  for (let plane in this.planes) {
    const value = this.planes[plane];
    const intersect = getPlaneLineIntersection(value, line);
    intersects[plane] = intersect;

    if (intersect.valid) {
      const hori = plane;
      const vert = intersect.y < this.centre.y ? "bottom" : "top";
      crossIntersects[`${hori}-${vert}`] = intersect;
    }
  }

  const filteredIntersects = Object.entries(intersects)
    .map(([key, value]) => ({ key, value }))
    .filter(({ value }) => value.z >= 0 && isPointOnLine(value, line));

  return { intersects, crossIntersects, filteredIntersects };
};
