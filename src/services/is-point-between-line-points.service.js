
import { getDistance3D } from "../logic/get-disance.logic";

export const isPointBetweenLinePoints = (point, line) => {
    const aDistance = getDistance3D(point, line.a);
    const bDistance = getDistance3D(point, line.b);
    return aDistance > line.aDistance && bDistance > line.distance;
}
