import { Point } from "./Point.model";

interface IOptions {
  colour?: string;
  id?: string;
  attributes?: Record<string, string>;
}

export class Polygon {
  points: Array<Point>;
  centre: Point;
  colour: string;
  id?: string;
  attributes?: Record<string, string>;

  constructor(points: Array<Point>, options?: IOptions) {
    const { colour, id, attributes } = options || {};

    this.points = points;
    {
      const x = points.reduce((a, b) => a + b.x, 0) / points.length;
      const y = points.reduce((a, b) => a + b.y, 0) / points.length;
      const z = points.reduce((a, b) => a + b.z, 0) / points.length;
      this.centre = new Point(x, y, z);
    }
    this.colour = colour || "#fff";
    id && (this.id = id);
    attributes && (this.attributes = attributes);
  }

  public clone({
    points: _points,
    ...rest
  }: {
    points?: Array<Point>;
  } & IOptions) {
    const { points, colour, id } = this;
    const options: IOptions = {
      colour: rest?.colour || colour,
    };
    id && (options.id = id);
    rest?.id && (options.id = id);
    return new Polygon(_points ?? points, options);
  }
}
