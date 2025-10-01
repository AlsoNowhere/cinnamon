import { IResolvedPolygon } from "../../interfaces/IResolvedPolygon.interface";

export const addPolygonsCanvas = (target: HTMLCanvasElement, polygons: Array<IResolvedPolygon>) => {
  for (let polygon of polygons) {
    const context = target.getContext("2d");
    if (context === null || polygon.points.length === 0) return;
    const { colour } = polygon.polygon;

    context.fillStyle = colour;

    // ** Translucency
    // context.globalAlpha = itemOpacity;

    context.beginPath();

    // ** The first point, where we should start drawing the polygon from.
    const [{ width, height }] = polygon.points;
    context.moveTo(width, height);

    for (let { width, height } of polygon.points.slice(1)) {
      context.lineTo(width, height);
    }

    context.closePath();
    context.fill();
  }
};
