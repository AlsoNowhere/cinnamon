import { findLastIndex } from "../../services/find-last-index.service";

import { resolveLine } from "./resolve-line.logic";
import { polywag } from "./poly-wag.logic";

import { Point } from "../../models/Point.model";
import { Line } from "../../models/Line.model";
import { Polygon } from "../../models/Polygon.model";

import { IJourney } from "../../interfaces/IJourney.interface";
import { ILineOutOfView } from "../../interfaces/ILineOutOfView.interface";
import { ILineInView } from "../../interfaces/ILineInView.interface";
import { ILineStartInView } from "../../interfaces/ILineStartInView.interface";
import { ILineNoneInView } from "../../interfaces/ILineNoneInView.interface";
import { IIntersect } from "../../interfaces/IIntersect.interface";
import { getDimensions } from "../../services/get-dimensions.service";
import { IResolvedPoint } from "../../interfaces/IResolvedPoint.interface";

export const resolvePolygon = function (polygon: Polygon) {
  const lines: Array<Line> = [];

  {
    let i = 0;
    while (i < polygon.points.length) {
      const a = polygon.points[i];
      const b = polygon.points[i + 1 === polygon.points.length ? 0 : i + 1];
      lines.push(new Line(a, b));
      i++;
    }
  }

  const points: Array<Point> = [];

  const story: Array<any> = [];

  lines.forEach((line) => {
    const rLine = resolveLine.apply(this, [line, true]);

    const { output, intersects } = rLine as ILineOutOfView;

    if (output === null) {
      story.push({ type: "neither in view", intersects });

      return;
    }

    const { start, end, inView } = rLine as ILineInView;

    if (inView === 1) {
      if ((start as ILineStartInView).startInView) {
        story.push({
          type: "start in view",
          points: { start, end },
          plane: (end as ILineNoneInView).plane,
          intersects,
        });
      } else {
        story.push({
          type: "end in view",
          points: { start, end },
          plane: (start as ILineNoneInView).plane,
          intersects,
        });
      }
    } else if (inView === 0) {
      const startIndex = intersects.findIndex((x: any) => x.inView);
      // const endIndex = intersects.findLastIndex((x: any) => x.inView);
      const endIndex = findLastIndex<IIntersect>(intersects, (x) => x.inView);
      const filteredIntersects = intersects.filter((x: IIntersect) => x.inView);
      const [start, end] = filteredIntersects.map((x: IIntersect) => ({
        resolvedPoint: getDimensions.apply(this, [
          x.value,
          true,
        ]) as IResolvedPoint,
        point: x.value,
      }));
      const pre = intersects.slice(0, startIndex);
      const post = intersects.slice(endIndex + 1);

      story.push({
        type: "intersects view",
        points: { start, end },
        intersects: {
          pre,
          post,
        },
      });
    } else {
      story.push({ type: "both in view", points: { start, end } });
    }
  });

  /* If no valid points ignore polygon */
  if (story.filter((x) => x.type !== "neither in view").length === 0) return [];

  const journeys: Array<IJourney> = [];

  story.forEach((part, index) => {
    if (part.type === "start in view" || part.type === "intersects view") {
      const journey: IJourney = { type: part.type, steps: [], points: [] };
      let i = index + 1;
      let control = 0;

      journey.steps.push(part.points.start, part.points.end);
      if (part.type === "start in view") {
        journey.steps.push(...part.intersects);
      } else if (part.type === "intersects view") {
        journey.steps.push(...part.intersects.post);
      }
      let j = 0;
      while (
        part.type === "start in view" ? j++ < story.length : j++ <= story.length
      ) {
        control++;
        if (control > 1000) throw "Control FAIL";
        if (i === story.length) {
          i = 0;
          continue;
        }
        const nextPart = story[i];
        if (nextPart.type === "end in view") {
          journey.steps.push(...nextPart.intersects);
          journey.steps.push(nextPart.points.start, nextPart.points.end);
          break;
        }
        if (nextPart.type === "intersects view") {
          journey.steps.push(...nextPart.intersects.pre);
          break;
        }
        if (nextPart.type === "neither in view") {
          journey.steps.push(...nextPart.intersects);
        }
        i++;
      }
      journeys.push(journey);
    }
    if (part.type === "both in view") {
      journeys.push({ steps: Object.values(part.points) });
    }
  });

  polywag.apply(this, [points, journeys]);

  const output = points.map((x: Point) => x.resolvedPoint);

  return output.filter((x) => x !== null);
};
