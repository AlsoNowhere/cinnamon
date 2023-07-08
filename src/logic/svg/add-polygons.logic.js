import { setAttributes } from "./attributes/set-attributes.logic";

export const addPolygonsSVG = (svg, polygons) => {
  polygons.forEach((polygon) => {
    const { id } = polygon;

    const polygonSVG = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "polygon"
    );

    const points = polygon.points
      .map((point) => `${point.width},${point.height}`)
      .join(" ");

    // Object.entries({
    //   points,
    //   style: `fill: ${polygon.colour};`,
    // }).forEach(([key, value]) => {
    //   polygonSVG.setAttribute(key, value);
    // });

    setAttributes(polygonSVG, {
      points,
      style: `fill: ${polygon.colour};`,
      id,
    });

    svg.appendChild(polygonSVG);
  });
};
