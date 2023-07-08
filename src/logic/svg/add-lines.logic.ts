import { IResolvedLine } from "../../interfaces/IResolvedLine.interface";
import { setAttributes } from "./attributes/set-attributes.logic";

export const addLinesSVG = (
  svg: SVGElement,
  lines: Array<IResolvedLine>
): void => {
  lines.forEach((line) => {
    const { start, end } = line;
    const { colour, thickness, id } = line.line;

    const svgLine = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "line"
    );

    setAttributes(svgLine, {
      x1: start.width,
      y1: start.height,
      x2: end.width,
      y2: end.height,
      style: {
        stroke: colour,
        "stroke-width": thickness + "px",
      },
      id,
    });

    svg.appendChild(svgLine);
  });
};
