import { generateAperture } from "../services/generate-aperture.service";
import { getDimensions } from "../services/get-dimensions.service";
import { getLineDimensions } from "../services/get-line-dimensions.service";
import { addPointsAtEdgeOfView } from "../services/add-points-at-edge-of-view.service";

import { resolver } from "../logic/resolver.logic";
import { render } from "../logic/render.logic";
import { addEvents } from "../logic/events/add-events.logic";
import { generatePlains } from "../logic/generate-plains.logic";
import { reset } from "../logic/reset.logic";

import { Point } from "../models/Point.model";
import { Line } from "../models/Line.model";
import { Polygon } from "../models/Polygon.model";
import { Plane } from "../models/Plane.model";
import { Setup } from "../models/Setup.model";
import { Direction } from "../models/Direction.model";
import { Aperture } from "../models/Aperture.model";
import { CircleView } from "../models/CircleView.model";

import { CinnamonEvents } from "../enums/CinnamonEvents.enum";

const resize = function () {
  const cinnamon = this as Cinnamon;

  const { target } = cinnamon;

  cinnamon.width = target.clientWidth;
  cinnamon.height = target.clientHeight;

  if (cinnamon.width === 0 || cinnamon.height === 0) {
    console.warn("Cinnamon: The width and or height for the element provided is 0.");
  }

  /* CANVAS Element */
  if (cinnamon.type === "canvas") {
    const target = cinnamon.target as HTMLCanvasElement;

    target.width = target.clientWidth;
    target.height = target.clientHeight;
  }

  cinnamon.aperture = generateAperture(cinnamon.baseAperture, cinnamon.width, cinnamon.height);
};

abstract class CinnamonBase {
  resize: typeof resize;
  resolver: typeof resolver;
  render: typeof render;
  addEvents: typeof addEvents;
  reset: typeof reset;
  getDimensions: typeof getDimensions;
  getLineDimensions: typeof getLineDimensions;
  addPointsAtEdgeOfView: typeof addPointsAtEdgeOfView;

  constructor() {
    this.resize = resize;
    this.resolver = resolver;
    this.render = render;
    this.addEvents = addEvents;
    this.reset = reset;
    this.getDimensions = getDimensions;
    this.getLineDimensions = getLineDimensions;
    this.addPointsAtEdgeOfView = addPointsAtEdgeOfView;
  }
}

export class Cinnamon extends CinnamonBase {
  target: SVGElement | HTMLCanvasElement;
  type: "svg" | "canvas";

  eventsList: Map<CinnamonEvents, () => void>;

  width: number;
  height: number;

  baseAperture: number;
  aperture: Aperture;

  centre: Point;
  direction: Direction;

  zeroZPlane: Plane;

  planes: Record<string, Plane>;
  plainers: Record<string, Plane>;

  points: Array<Point>;
  lines: Array<Line>;
  polygons: Array<Polygon>;

  circleView: null | CircleView;

  constructor(target: SVGElement | HTMLCanvasElement, setup = new Setup()) {
    super();
    this.target = target;
    const { nodeName } = target;
    if (nodeName !== "svg" && nodeName !== "CANVAS") {
      throw new Error("Element must be either SVG or CANVAS.");
    }
    if (nodeName === "svg") {
      this.type = "svg";
    }
    if (nodeName === "CANVAS") {
      this.type = "canvas";
    }

    this.eventsList = new Map();

    this.baseAperture = setup.baseAperture;

    this.resize();

    this.centre = setup.centre;
    this.direction = setup.direction;

    generatePlains(this);

    this.points = [];
    this.lines = [];
    this.polygons = [];
  }
}
