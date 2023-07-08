import { round } from "./round.service";

export const getDistance3D = (a, b) =>
  round(
    Math.pow(
      Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2) + Math.pow(b.z - a.z, 2),
      1 / 2
    )
  );

export const getDistance2DXZ = (a, b) =>
  round(Math.pow(Math.pow(b.x - a.x, 2) + Math.pow(b.z - a.z, 2), 1 / 2));

export const getDistance2DZXY = (a, b) =>
  round(
    Math.pow(Math.pow(getDistance2DXZ(a, b), 2) + Math.pow(b.y - a.y, 2), 1 / 2)
  );

export const getDistance2D = (a, b) =>
  round(Math.pow(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2), 1 / 2));
