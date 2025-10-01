import { setAttributes } from "./attributes/set-attributes.logic";

import { IResolvedPolygon } from "../../interfaces/IResolvedPolygon.interface";

export const addPolygonsSVG = (svg: SVGElement, polygons: Array<IResolvedPolygon>): void => {
  polygons.forEach((polygon) => {
    const { colour, id } = polygon.polygon;

    const polygonSVG = document.createElementNS("http://www.w3.org/2000/svg", "polygon");

    const points = polygon.points.map(({ width, height }) => `${width},${height}`).join(" ");

    setAttributes(polygonSVG, {
      points,
      style: `fill: ${colour};`,
      id,
    });

    svg.appendChild(polygonSVG);
  });
};
