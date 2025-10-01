import { Cinnamon } from "../main/Cinnamon";

import { getPlaneFromThreePoints } from "../services/get-plane-from-three-points.service";

import { Point } from "..//models/Point.model";

import { RADIANS } from "../data/RADIANS.data";

export const generatePlains = (cinnamon: Cinnamon) => {
  cinnamon.zeroZPlane = getPlaneFromThreePoints(new Point(0, 0, 0), new Point(10, 0, 0), new Point(10, 10, 0));

  const [x, y, z] = [
    Math.sin(cinnamon.aperture.zx / RADIANS),
    Math.tan(cinnamon.aperture.y / RADIANS),
    Math.cos(cinnamon.aperture.zx / RADIANS),
  ];
  cinnamon.planes = {
    top: getPlaneFromThreePoints(new Point(0, 0, 0), new Point(-1, y, 1), new Point(1, y, 1)),
    right: getPlaneFromThreePoints(new Point(0, 0, 0), new Point(x, -1, z), new Point(x, 1, z)),
    bottom: getPlaneFromThreePoints(new Point(0, 0, 0), new Point(-1, -y, 1), new Point(1, -y, 1)),
    left: getPlaneFromThreePoints(new Point(0, 0, 0), new Point(-x, -1, z), new Point(-x, 1, z)),
  };
  cinnamon.plainers = {
    "top-right": getPlaneFromThreePoints(new Point(0, 0, 0), new Point(x, y, z), new Point(-x, -y, z)),
    "top-left": getPlaneFromThreePoints(new Point(0, 0, 0), new Point(-x, y, z), new Point(x, -y, z)),
  };
};
