export const Point = function (x, y, z, { colour, size, id, ignore } = {}) {
  this.valid = !isNaN(x) && !isNaN(y) && !isNaN(z);

  this.x = x;
  this.y = y;
  this.z = z;
  this.colour = colour || "#fff";
  this.size = size || 3;
  this.id = id;
  this.ignore = ignore || false;

  Object.freeze(this);
};
