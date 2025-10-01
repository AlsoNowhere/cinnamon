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

    const [dX, dY, dZ] = (["x", "y", "z"] as ["x", "y", "z"]).map(
      (x) => end[x] - start[x]
    );

    const x = { c: start.x, t: dX };
    const y = { c: start.y, t: dY };
    const z = { c: start.z, t: dZ };

    this.parametric = { x, y, z };

    this.distance = getDistance3D(start, end);

    this.colour = colour || "#fff";
    this.thickness = thickness || 1;
    id && (this.id = id);
    this.ignore = ignore || false;
  }
}
