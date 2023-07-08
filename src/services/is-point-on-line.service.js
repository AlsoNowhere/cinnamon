/*
    Does not check is point completes the line equation, it assumes that it does.
    Checks if the point is between the start and end.

    --start-------POINT-------end--
    The above would return true.

    --POINT----start-------end--
    The above would return false.
*/

import { getDistance2D, getDistance3D } from "./get-distance.service";
import { round } from "./round.service";

export const isPointOnLine = (point, line) => {
  const distanceToStart = getDistance3D(point, line.start);
  const distanceToEnd = getDistance3D(point, line.end);

  return (
    round(distanceToStart) <= round(line.distance) &&
    round(distanceToEnd) <= round(line.distance)
  );
};

export const isPointOnLine2D = (point, line) => {
  const distanceToStart = getDistance2D(point, { x: line.x1, y: line.y1 });
  const distanceToEnd = getDistance2D(point, { x: line.x2, y: line.y2 });

  return (
    round(distanceToStart) <= round(line.distance) &&
    round(distanceToEnd) <= round(line.distance)
  );
};
