import { round } from "./round.service";

import { RADIANS } from "../data/RADIANS.data";

const buffer = 0.000_000_000_001;

export const isPointInView = function (point) {
  const { x, y, z } = point;

  if (z < 0) return false;
  const angleZX = round(Math.atan(x / z) * RADIANS);
  const angleY = round(Math.atan(y / z) * RADIANS);

  // console.log("Goose muncher: ", x, y, z, "|", angleZX, angleY, this.aperture);

  if (
    angleZX <= -this.aperture.zx - buffer ||
    angleZX >= this.aperture.zx + buffer
  )
    return false;
  if (angleY <= -this.aperture.y - buffer || angleY >= this.aperture.y + buffer)
    return false;
  return true;
};
