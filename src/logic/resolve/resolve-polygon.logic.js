import { resolveLine } from "./resolve-line.logic";

import { Line } from "../../models/Line.model";
import { polywag } from "./poly-wag.logic";

export const resolvePolygon = function (polygon) {
  const lines = [];

  {
    let i = 0;
    while (i < polygon.points.length) {
      const a = polygon.points[i];
      const b = polygon.points[i + 1 === polygon.points.length ? 0 : i + 1];
      lines.push(new Line(a, b));
      i++;
    }
  }

  const points = [];

  const story = [];

  lines.forEach((line) => {
    const rLine = resolveLine.apply(this, [line, true]);

    const { output, intersects } = rLine;

    // console.log("Rline: ", rLine);

    if (output === null) {
      story.push({ type: "neither in view", intersects });

      return;
    }

    const { start, end, inView } = rLine;

    if (inView === 1) {
      if (start.startInView) {
        story.push({
          type: "start in view",
          points: { start, end },
          plane: end.plane,
          intersects,
        });
      } else {
        story.push({
          type: "end in view",
          points: { start, end },
          plane: start.plane,
          intersects,
        });
      }
    } else if (inView === 0) {
      const startIndex = intersects.findIndex((x) => x.inView);
      const endIndex = intersects.findLastIndex((x) => x.inView);
      const filteredIntersects = intersects.filter((x) => x.inView);
      const [start, end] = filteredIntersects.map((x) => ({
        resolvedPoint: this.getDimensions(x.value, true),
        point: x.value,
      }));
      const pre = intersects.slice(0, startIndex);
      const post = intersects.slice(endIndex + 1);

      // console.log(
      //   "Golden loose: ",
      //   intersects,
      //   startIndex,
      //   endIndex,
      //   filteredIntersects[0],
      //   filteredIntersects[1],
      //   pre,
      //   post
      // );

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

  const journeys = [];

  story.forEach((part, index) => {
    if (part.type === "start in view" || part.type === "intersects view") {
      const journey = { type: part.type, steps: [], points: [] };
      let i = index + 1;
      let control = 0;

      // journey.points.push(part.points.start, part.points.end);
      journey.steps.push(part.points.start, part.points.end);
      if (part.type === "start in view") {
        journey.steps.push(...part.intersects);
      } else if (part.type === "intersects view") {
        journey.steps.push(...part.intersects.post);
      }
      let j = 0;
      // while (i !== index) {
      while (
        part.type === "start in view" ? j++ < story.length : j++ <= story.length
      ) {
        // console.log("Wander: ", part.type, j - 1, story.length, i);
        control++;
        if (control > 1000) throw "Control FAIL";
        if (i === story.length) {
          i = 0;
          continue;
        }
        const nextPart = story[i];
        if (nextPart.type === "end in view") {
          journey.steps.push(...nextPart.intersects);
          // journey.points.push(nextPart.points.start, nextPart.points.end);
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
      // journeys.push({ points: part.points });
      journeys.push({ steps: Object.values(part.points) });
    }
  });

  // console.log("Story: ", story, journeys);

  polywag.apply(this, [points, journeys]);

  const output = points.map((x) => x.resolvedPoint);

  // console.log("Output: ", output, points);

  return output.filter((x) => x !== null);
};
