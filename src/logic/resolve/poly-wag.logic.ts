import { Cinnamon } from "../../main/Cinnamon";

import { getDimensions } from "../../services/get-dimensions.service";

import { Point } from "../../models/Point.model";

import { IJourney } from "../../interfaces/IJourney.interface";
import { ILineShowResolved } from "../../interfaces/ILineShowResolved.interface";
import { IResolvedPoint } from "../../interfaces/IResolvedPoint.interface";

const resolveCorner = (
  points: Array<ILineShowResolved>,
  corner: Array<string>,
  w: number,
  h: number
) => {
  const [a, b] = [...corner].reverse().slice(0, 2).reverse();
  const [a1, a2] = a.split("-");
  const [b1, b2] = b.split("-");
  if (a1 === b2 && a2 === b1) {
    if ([a1, b1].includes("top") && [a1, b1].includes("right")) {
      points.push({
        resolvedPoint: { width: w, height: 0, point: new Point(0, 0, 0) },
      });
      corner.pop();
      corner.pop();
    }
    if ([a1, b1].includes("bottom") && [a1, b1].includes("right")) {
      points.push({
        resolvedPoint: { width: w, height: h, point: new Point(0, 0, 0) },
      });
      corner.pop();
      corner.pop();
    }
    if ([a1, b1].includes("bottom") && [a1, b1].includes("left")) {
      points.push({
        resolvedPoint: { width: 0, height: h, point: new Point(0, 0, 0) },
      });
      corner.pop();
      corner.pop();
    }
    if ([a1, b1].includes("top") && [a1, b1].includes("left")) {
      points.push({
        resolvedPoint: { width: 0, height: 0, point: new Point(0, 0, 0) },
      });
      corner.pop();
      corner.pop();
    }
  }
};

export const polywag = function (
  points: Array<ILineShowResolved>,
  journeys: Array<IJourney>
) {
  const _this = this as Cinnamon;
  journeys.forEach((journey) => {
    if (!!journey.steps) {
      const corner: Array<string> = [];

      journey.steps.forEach((x) => {
        if (x.resolvedPoint !== undefined) {
          points.push(x);
          return;
        }

        if (!x.inView) {
          const [last] = corner.slice(-1);
          if (last === `${x.key}-${x.direction}`) {
          } else {
            corner.push(`${x.key}-${x.direction}`);
          }
          if (corner.length < 2) {
            return;
          }

          resolveCorner(points, corner, _this.width, _this.height);

          return;
        }
        const resolvedPoint: IResolvedPoint = getDimensions.apply(_this, [
          x.value,
          true,
        ]);

        points.push({
          resolvedPoint,
          point: x.value,
        });
      });
    }
  });
};
