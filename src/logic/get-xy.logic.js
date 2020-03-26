import { RADIANS } from "../constants/RADIANS"

export const getXY = (angle,distance) => {

    const x = Math.sin(angle / RADIANS) * distance;
    const y = Math.cos(angle / RADIANS) * distance;

    return {
        x,
        y
    }
}
