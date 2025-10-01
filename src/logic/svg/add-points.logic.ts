import { Cinnamon } from "../../main/Cinnamon";

import { setAttributes } from "./attributes/set-attributes.logic";
import { addPointsCommon } from "../common-render/add-points-common.logic";

import { IResolvedPoint } from "../../interfaces/IResolvedPoint.interface";

export const addPointsSVG = (cinnamon: Cinnamon, points: Array<IResolvedPoint>): void => {
  const { target } = cinnamon;

  for (let point of points) {
    const { width, height } = point;
    const { colour, id } = point.point;
    const { opacity, size } = addPointsCommon(cinnamon, point);

    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");

    setAttributes(circle, {
      cx: width,
      cy: height,
      r: size,
      style: { fill: colour, opacity },
      id,
    });

    target.appendChild(circle);
  }
};
