import { Cinnamon } from "../main/Cinnamon";

import { clearSVG } from "./svg/clear-svg.logic";
import { addPointsSVG } from "./svg/add-points.logic";
import { addLinesSVG } from "./svg/add-lines.logic";
import { addPolygonsSVG } from "./svg/add-polygons.logic";
import { resolver } from "./resolver.logic";

export interface IRenderOptions {
  renderClosestLast?: boolean;
}

export const render = function (options: IRenderOptions = {}) {
  const cinnamon = this as Cinnamon;

  const renderClosestLast = options.renderClosestLast ?? false;

  const { points, lines, polygons } = resolver.apply(cinnamon, [
    renderClosestLast,
  ]);

  if (cinnamon.name === "svg") {
    clearSVG(cinnamon.target);
    addPolygonsSVG(cinnamon.target, polygons);
    addLinesSVG(cinnamon.target, lines);
    addPointsSVG(cinnamon.target, points);
  }
};
