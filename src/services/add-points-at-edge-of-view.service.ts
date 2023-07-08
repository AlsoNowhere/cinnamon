import { getDistance3D } from "./get-distance.service";
import { getPlaneLineIntersection } from "./get-plane-line-intersect.service";
import { isPointOnLine } from "./is-point-on-line.service";

import { Point } from "../models/Point.model";
import { Line } from "../models/Line.model";
import { Plane } from "../models/Plane.model";

export const addPointsAtEdgeOfView = function (
  points: Array<Point>,
  line: Line,
  planes: Record<string, Plane>
): void {
  const { topViewPlane, rightViewPlane, bottomViewPlane, leftViewPlane } =
    planes;

  const topIntersect = getPlaneLineIntersection(topViewPlane, line);
  const rightIntersect = getPlaneLineIntersection(rightViewPlane, line);
  const bottomIntersect = getPlaneLineIntersection(bottomViewPlane, line);
  const leftIntersect = getPlaneLineIntersection(leftViewPlane, line);

  const isTopOnLine = isPointOnLine(topIntersect, line);
  const isRightOnLine = isPointOnLine(rightIntersect, line);
  const isBottomOnLine = isPointOnLine(bottomIntersect, line);
  const isLeftOnLine = isPointOnLine(leftIntersect, line);

  const intercepts = [];

  if (isTopOnLine && topIntersect.z >= 0) {
    intercepts.push({
      point: topIntersect,
      dimensions: this.getDimensions(topIntersect),
      name: "top",
    });
  }
  if (isBottomOnLine && bottomIntersect.z >= 0) {
    intercepts.push({
      point: bottomIntersect,
      dimensions: this.getDimensions(bottomIntersect),
      name: "bottom",
    });
  }
  if (isRightOnLine) {
    if (rightIntersect.z >= 0) {
      intercepts.push({
        point: rightIntersect,
        dimensions: this.getDimensions(rightIntersect, true),
        name: "right",
      });
    } else {
      intercepts.push({
        point: rightIntersect,
        dimensions: {
          width: 0,
          height: rightIntersect.y > 0 ? 0 : this.height,
        },
        name: "right",
      });
    }
  }
  if (isLeftOnLine) {
    if (leftIntersect.z >= 0) {
      intercepts.push({
        point: leftIntersect,
        dimensions: this.getDimensions(leftIntersect, true),
        name: "left",
      });
    } else {
      intercepts.push({
        point: leftIntersect,
        dimensions: {
          width: this.width,
          height: leftIntersect.y > 0 ? 0 : this.height,
        },
        name: "left",
      });
    }
  }

  points.push(
    ...intercepts
      .filter(({ dimensions }) => !!dimensions)
      .sort(
        (a, b) =>
          getDistance3D(line.start, a.point) -
          getDistance3D(line.start, b.point)
      )
      .map(({ dimensions }) => dimensions)
  );
};
