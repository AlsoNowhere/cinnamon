import { RADIANS } from "../constants/RADIANS";

export const getAngle = (a,b) => {
    const dx = b.x-a.x;
    const dy = b.y-a.y;
    const angle = Math.atan(dx/dy) * RADIANS;
    return angle;
}