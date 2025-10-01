import { Cinnamon } from "../../main/Cinnamon";

import { IResolvedPoint } from "../../interfaces/IResolvedPoint.interface";
import { addPointsCommon } from "../common-render/add-points-common.logic";

export const addPointCanvas = (cinnamon: Cinnamon, point: IResolvedPoint) => {
  const target = cinnamon.target as HTMLCanvasElement;
  const context = target.getContext("2d");
  if (context === null) return;

  const {
    width,
    height,
    point: { colour },
  } = point;

  const { opacity, size } = addPointsCommon(cinnamon, point);

  context.fillStyle = colour;
  context.globalAlpha = opacity;
  context.beginPath();
  context.arc(width, height, size, 0, 2 * Math.PI);
  context.fill();
};

export const addPointsCanvas = (cinnamon: Cinnamon, points: Array<IResolvedPoint>) => {
  for (let point of points) {
    addPointCanvas(cinnamon, point);
  }
};
