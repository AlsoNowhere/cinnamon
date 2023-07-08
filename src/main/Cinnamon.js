import { generateAperture } from "../services/generate-aperture.service";
import { getDimensions } from "../services/get-dimensions.service";
import { getLineDimensions } from "../services/get-line-dimensions.service";
import { addPointsAtEdgeOfView } from "../services/add-points-at-edge-of-view.service";
import { getCorners } from "../services/get-corners.service";
import { getPlaneFromThreePoints } from "../services/get-plane-from-three-points.service";

import { render } from "../logic/render.logic";
import { addEvents } from "../logic/add-events.logic";

import { Setup } from "../models/Setup.model";
import { Point } from "../models/Point.model";

import { RADIANS } from "../data/RADIANS.data";

export const Cinnamon = function (target, setup = new Setup()) {
  this.target = target;
  const { nodeName: name } = target;
  this.name = name;
  if (name !== "svg" && name !== "CANVAS") {
    throw new Error("Element must be either SVG or CANVAS.");
  }
  this.width = target.clientWidth;
  this.height = target.clientHeight;

  /* CANVAS Element */
  if (name === "CANVAS") {
    target.width = target.clientWidth;
    target.height = target.clientHeight;
  }

  this.centre = setup.centre;
  this.direction = setup.direction;
  this.aperture = generateAperture(setup.aperture, this.width, this.height);

  this.zeroZPlane = getPlaneFromThreePoints(
    new Point(0, 0, 0),
    new Point(10, 0, 0),
    new Point(10, 10, 0)
  );

  {
    const [x, y, z] = [
      Math.sin(this.aperture.zx / RADIANS),
      Math.tan(this.aperture.y / RADIANS),
      Math.cos(this.aperture.zx / RADIANS),
    ];
    this.planes = {
      top: getPlaneFromThreePoints(
        new Point(0, 0, 0),
        new Point(-1, y, 1),
        new Point(1, y, 1)
      ),
      right: getPlaneFromThreePoints(
        new Point(0, 0, 0),
        new Point(x, -1, z),
        new Point(x, 1, z)
      ),
      bottom: getPlaneFromThreePoints(
        new Point(0, 0, 0),
        new Point(-1, -y, 1),
        new Point(1, -y, 1)
      ),
      left: getPlaneFromThreePoints(
        new Point(0, 0, 0),
        new Point(-x, -1, z),
        new Point(-x, 1, z)
      ),
    };
    this.plainers = {
      "top-right": getPlaneFromThreePoints(
        new Point(0, 0, 0),
        new Point(x, y, z),
        new Point(-x, -y, z)
      ),
      "top-left": getPlaneFromThreePoints(
        new Point(0, 0, 0),
        new Point(-x, y, z),
        new Point(x, -y, z)
      ),
    };
  }

  this.render = render;
  this.addEvents = addEvents;

  this.points = [];
  this.lines = [];
  this.polygons = [];
};

Cinnamon.prototype = {
  getDimensions,
  getLineDimensions,
  addPointsAtEdgeOfView,
  getCorners,
};
