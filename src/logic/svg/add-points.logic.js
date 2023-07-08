import { setAttributes } from "./attributes/set-attributes.logic";

export const addPointsSVG = (svg, points) => {
  points.forEach((point) => {
    const { colour, id } = point;

    const circle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );

    // Object.entries({
    //   cx: point.width,
    //   cy: point.height,
    //   r: 3,
    //   style: "fill:#fff",
    // }).forEach(([key, value]) => {
    //   circle.setAttribute(key, value);
    // });

    setAttributes(circle, {
      cx: point.width,
      cy: point.height,
      r: point.size,
      style: { fill: colour },
      id,
    });

    svg.appendChild(circle);
  });
};
