import { Line } from "../models/Line.model";
import { Plane } from "../models/Plane.model";
import { ILineDimensions, ILineDimensionsMetaData } from "../interfaces/ILineDimensions.interface";
export declare const getLineDimensions: (line: Line, topViewPlane: Plane, rightViewPlane: Plane, bottomViewPlane: Plane, leftViewPlane: Plane) => ILineDimensions & {
    metaData: ILineDimensionsMetaData;
};
