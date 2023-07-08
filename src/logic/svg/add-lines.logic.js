import { setAttributes } from "./attributes/set-attributes.logic";

export const addLinesSVG = (svg, lines) => {
  lines.forEach((line) => {
    const { id } = line;

    const svgLine = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "line"
    );

    // Object.entries({
    //   x1: line.start.width,
    //   y1: line.start.height,
    //   x2: line.end.width,
    //   y2: line.end.height,
    //   id,
    //   // style: "stroke:#fff;stroke-width:1px;",
    //   style: {
    //     stroke: line.colour,
    //     "stroke-width": line.thickness + "px",
    //   },
    // }).forEach(([key, value]) => {
    //   if (value instanceof Object) {
    //     value = Object.entries(value)
    //       .map(([key, value]) => `${key}: ${value};`)
    //       .join(" ");
    //   }
    //   svgLine.setAttribute(key, value);
    // });

    setAttributes(svgLine, {
      x1: line.start.width,
      y1: line.start.height,
      x2: line.end.width,
      y2: line.end.height,
      style: {
        stroke: line.colour,
        "stroke-width": line.thickness + "px",
      },
      id,
    });

    svg.appendChild(svgLine);
  });
};
