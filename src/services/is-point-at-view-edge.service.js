import { round } from "./round.service";

import { RADIANS } from "../data/RADIANS.data";

export const isPointAtViewEdge = function (point, type) {
  let output = true;
  if (type === "vertical") {
    const angle = round(Math.atan(point.y / point.z)) * RADIANS;
    if (angle > this.aperture.y) output = "top";
    if (angle < -this.aperture.y) output = "bottom";
  }
  if (type === "horizontal") {
    const angle = round(Math.atan(point.x / point.z)) * RADIANS;
    if (angle > this.aperture.zx) output = "right";
    if (angle < -this.aperture.zx) output = "left";
  }
  return output;
};
