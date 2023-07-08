const resolveCorner = (points, corner, w, h) => {
  const [a, b] = [...corner].reverse().slice(0, 2).reverse();
  const [a1, a2] = a.split("-");
  const [b1, b2] = b.split("-");
  if (a1 === b2 && a2 === b1) {
    if ([a1, b1].includes("top") && [a1, b1].includes("right")) {
      points.push({ resolvedPoint: { width: w, height: 0 } });
      corner.pop();
      corner.pop();
    }
    if ([a1, b1].includes("bottom") && [a1, b1].includes("right")) {
      points.push({ resolvedPoint: { width: w, height: h } });
      corner.pop();
      corner.pop();
    }
    if ([a1, b1].includes("bottom") && [a1, b1].includes("left")) {
      points.push({ resolvedPoint: { width: 0, height: h } });
      corner.pop();
      corner.pop();
    }
    if ([a1, b1].includes("top") && [a1, b1].includes("left")) {
      points.push({ resolvedPoint: { width: 0, height: 0 } });
      corner.pop();
      corner.pop();
    }
  }
};

export const polywag = function (points, journeys) {
  journeys.forEach((journey) => {
    // console.log("Polywag journey: ", journey.steps);

    // points.push(...journey.points);
    if (!!journey.steps) {
      const corner = [];

      journey.steps.forEach((x) => {
        // console.log("Step: ", x);

        if (x.resolvedPoint !== undefined) {
          points.push(x);
          return;
        }

        if (!x.inView) {
          // if (
          //   !(typeof x.key === "string" && typeof x.direction === "string")
          // ) {
          //   return;
          // }
          const [last] = corner.slice(-1);
          if (last === `${x.key}-${x.direction}`) {
          } else {
            corner.push(`${x.key}-${x.direction}`);
          }
          if (corner.length < 2) {
            return;
          }

          resolveCorner(points, corner, this.width, this.height);

          return;
        }
        const resolvedPoint = this.getDimensions.apply(this, [x.value, true]);
        points.push({
          resolvedPoint,
          point: x.value,
        });
      });

      //   console.log("Get sum: ", corner);
    }
  });
};
