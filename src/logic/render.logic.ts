import { Cinnamon } from "../main/Cinnamon";

import { clearSVG } from "./svg/clear-svg.logic";
import { addPointsSVG } from "./svg/add-points.logic";
import { addLinesSVG } from "./svg/add-lines.logic";
import { addPolygonsSVG } from "./svg/add-polygons.logic";

import { clearCanvas } from "./canvas/clear-canvas.logic";
import { addPointsCanvas } from "./canvas/add-points.logic";
import { addLinesCanvas } from "./canvas/add-lines.logic";
import { addPolygonsCanvas } from "./canvas/add-polygons.logic";

export interface IRenderOptions {
  renderClosestLast?: boolean;
}

export const render = function (options: IRenderOptions = {}) {
  const cinnamon = this as Cinnamon;

  const { points, lines, polygons } = cinnamon.resolver();

  if (cinnamon.type === "svg") {
    const target = cinnamon.target as SVGElement;
    clearSVG(target);
    addPolygonsSVG(target, polygons);
    addLinesSVG(target, lines);
    addPointsSVG(cinnamon, points);
  }

  if (cinnamon.type === "canvas") {
    const target = cinnamon.target as HTMLCanvasElement;
    clearCanvas(target);
    addPolygonsCanvas(target, polygons);
    addLinesCanvas(target, lines);
    addPointsCanvas(cinnamon, points);
  }
};
