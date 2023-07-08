export const Polygon = function (points = [], { colour, id } = {}) {
  this.points = points;
  this.colour = colour || "#fff";
  this.id = id;

  Object.freeze(this);
};
