import { Cinnamon } from "../../main/Cinnamon";

import { getDistance3D } from "../../services/get-distance.service";
import { getMagnitude } from "../../services/resolve-magnitude.service";

import { IResolvedPoint } from "../../interfaces/IResolvedPoint.interface";

export const addPointsCommon = (cinnamon: Cinnamon, point: IResolvedPoint) => {
  const {
    point: { colourMagnitude, sizeMagnitude },
  } = point;

  const distance = getDistance3D(cinnamon.centre, point.point);

  let opacity = 1;
  if (colourMagnitude) {
    const mag = getMagnitude({ distance });
    opacity = mag * colourMagnitude;
  }

  let { size } = point.point;
  if (sizeMagnitude) {
    const mag = getMagnitude({ distance });
    size = size + mag * sizeMagnitude;
  }

  return { opacity, size };
};
