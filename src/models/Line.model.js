import { getDistance3D } from "../services/get-distance.service";

export const Line = function (
  start,
  end,
  { colour, thickness, id, ignore } = {}
) {
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
  this.id = id;
  this.ignore = ignore || false;

  Object.freeze(this);
};
