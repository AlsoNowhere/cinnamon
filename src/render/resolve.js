import { RADIANS } from "../constants/RADIANS";

export const resolveZX = (pointA,pointB) => {
    return Math.atan((pointB.x - pointA.x) / (pointB.z - pointA.z)) * RADIANS;
}

export const resolveY = (pointA,pointB) => {
    return Math.atan((pointB.y - pointA.y) / (Math.pow(Math.pow(pointB.z,2)+Math.pow(pointB.x,2),1/2) - Math.pow(Math.pow(pointA.z,2)+Math.pow(pointA.x,2),1/2))) * RADIANS;
    // return Math.atan((pointB.y - pointA.y) / (pointB.z - pointA.z)) * RADIANS;
}
