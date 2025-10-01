import { IResolvedPoint } from "../interfaces/IResolvedPoint.interface";

interface IOptions {
  colour?: string | [string, number];
  size?: number | [number, number];
  id?: string;
  ignore?: boolean;
}

export class Point {
  valid: boolean;

  readonly x: number;
  readonly y: number;
  readonly z: number;

  colour: string;
  colourMagnitude?: number;
  size: number;
  sizeMagnitude?: number;

  id?: string;

  ignore: boolean;

  resolvedPoint: IResolvedPoint;

  constructor(x: number, y: number, z: number, options?: IOptions) {
    const { colour, size, id, ignore } = options || {};

    this.valid = !isNaN(x) && !isNaN(y) && !isNaN(z);

    this.x = x;
    this.y = y;
    this.z = z;

    if (colour instanceof Array) {
      this.colour = colour[0];
      this.colourMagnitude = colour[1];
    } else {
      this.colour = colour || "#fff";
    }

    if (size instanceof Array) {
      this.size = size[0];
      this.sizeMagnitude = size[1];
    } else {
      this.size = size || 3;
    }

    !!id && (this.id = id);

    this.ignore = ignore || false;

    Object.freeze(this);
  }

  public clone({
    x: _x,
    y: _y,
    z: _z,
    options: _options,
  }: {
    x?: number;
    y?: number;
    z?: number;
    options?: IOptions;
  } = {}) {
    const { x, y, z, colour, size, id, ignore } = this;
    const options: IOptions = {
      colour: _options?.colour || colour,
      size: _options?.size || size,
      ignore: _options?.ignore || ignore,
    };
    id && (options.id = id);
    _options?.id && (options.id = id);
    return new Point(_x ?? x, _y ?? y, _z ?? z, options);
  }

  public matches({ x, y, z }: Point) {
    return this.x === x && this.y == y && this.z === z;
  }
}
