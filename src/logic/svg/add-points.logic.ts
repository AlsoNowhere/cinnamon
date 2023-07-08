import { setAttributes } from "./attributes/set-attributes.logic";

import { IResolvedPoint } from "../../interfaces/IResolvedPoint.interface";

export const addPointsSVG = (
  svg: SVGElement,
  points: Array<IResolvedPoint>
): void => {
  points.forEach((point) => {
    const { width, height } = point;
    const { colour, size, id } = point.point;

    const circle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );

    setAttributes(circle, {
      cx: width,
      cy: height,
      r: size,
      style: { fill: colour },
      id,
    });

    svg.appendChild(circle);
  });
};
