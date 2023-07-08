import { getDistance3D } from "../services/get-distance.service";

import { Point } from "./Point.model";

interface IParametric {
  c: number;
  t: number;
}

interface IOptions {
  colour: string;
  thickness: number;

  id?: string;

  ignore: boolean;
}

export class Line {
  start: Point;
  end: Point;

  parametric: { x: IParametric; y: IParametric; z: IParametric };
  distance: number;

  colour: string;
  thickness: number;

  id?: string;

  ignore: boolean;

  constructor(start: Point, end: Point, options?: IOptions) {
    const { colour, thickness, id, ignore } = options || {};
    this.start = start;
    this.end = end;

    const difference = {
      x: end.x - start.x,
      y: end.y - start.y,
      z: end.z - start.z,
    };

    const x = { c: start.x, t: difference.x };
    const y = { c: start.y, t: difference.y };
    const z = { c: start.z, t: difference.z };

    this.parametric = { x, y, z };

    this.distance = getDistance3D(start, end);

    this.colour = colour || "#fff";
    this.thickness = thickness || 1;
    id && (this.id = id);
    this.ignore = ignore || false;
  }
}
