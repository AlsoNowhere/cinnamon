import { clearSVG } from "./svg/clear-svg.logic";
import { addPointsSVG } from "./svg/add-points.logic";
import { addLinesSVG } from "./svg/add-lines.logic";
import { addPolygonsSVG } from "./svg/add-polygons.logic";
import { renderer } from "./render/renderer.logic";

export const render = function () {
  const { points, lines, polygons } = renderer.apply(this);

  if (this.name === "svg") {
    clearSVG(this.target);
    addPolygonsSVG(this.target, polygons);
    addLinesSVG(this.target, lines);
    addPointsSVG(this.target, points);
  }
};
