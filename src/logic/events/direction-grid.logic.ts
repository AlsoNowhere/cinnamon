import { Cinnamon } from "../../main/Cinnamon";

import { Direction } from "../../models/Direction.model";
import { Point } from "../../models/Point.model";

import { keys } from "../../data/variables.data";

export const directionGrid = (cinnamon: Cinnamon, target: HTMLElement | SVGElement) => {
  target.addEventListener("keydown", (event: KeyboardEvent) => {
    const { key } = event;
    const { x, y, z } = cinnamon.centre;
    const { zx, y: dirY } = cinnamon.direction;

    if (key === "ArrowRight") {
      if (keys.Shift) {
        cinnamon.direction = new Direction(zx + 15, dirY);
      } else {
        cinnamon.centre = new Point(x + 1, y, z);
      }
    }

    if (key === "ArrowLeft") {
      if (keys.Shift) {
        cinnamon.direction = new Direction(zx - 15, dirY);
      } else {
        cinnamon.centre = new Point(x - 1, y, z);
      }
    }

    if (key === "ArrowUp") {
      if (keys.Shift) {
        cinnamon.direction = new Direction(zx, dirY + 15);
      } else if (keys.Alt) {
        cinnamon.centre = new Point(x, y, z + 1);
      } else {
        cinnamon.centre = new Point(x, y + 1, z);
      }
    }

    if (key === "ArrowDown") {
      if (keys.Shift) {
        cinnamon.direction = new Direction(zx, dirY - 15);
      } else if (keys.Alt) {
        cinnamon.centre = new Point(x, y, z - 1);
      } else {
        cinnamon.centre = new Point(x, y - 1, z);
      }
    }
  });
};
