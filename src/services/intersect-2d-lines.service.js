import { isPointOnLine2D } from "./is-point-on-line.service";

export const intersect2dLines = (lineA, lineB) => {
  /* m1x + c1 = m2x + c2 */
  const x =
    (lineB.intersect - lineA.intersect) / (lineA.gradient - lineB.gradient);
  /* ym2 - ym1 = c1m2 - c2m1 */
  const y =
    (lineA.intersect * lineB.gradient - lineB.intersect * lineA.gradient) /
    (lineB.gradient - lineA.gradient);

  if (!isPointOnLine2D({ x, y }, lineA) || !isPointOnLine2D({ x, y }, lineB)) {
    return null;
  }
  return { x, y };
};
