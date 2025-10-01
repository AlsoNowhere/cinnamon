import { Cinnamon } from "../main/Cinnamon";

export const reset = function () {
  const cinnamon = this as Cinnamon;

  // ** Remove all render items.
  cinnamon.points.length = 0;
  cinnamon.lines.length = 0;
  cinnamon.polygons.length = 0;

  // ** Remove the events that have been added.
  for (let [, item] of cinnamon.eventsList) {
    item();
  }
};
