import { Point } from "../models/Point.model";
import { Direction } from "../models/Direction.model";

const keyUps = ["Shift", "Alt"];
const keyDowns = [
  "ArrowRight",
  "ArrowLeft",
  "ArrowUp",
  "ArrowDown",
  "Shift",
  "Alt",
];

let shifted = false;
let alted = false;

export const addEvents = function (target = this.target) {
  target.addEventListener("keyup", (event: KeyboardEvent) => {
    const { key } = event;

    if (!keyUps.includes(key)) return;

    if (key === "Shift") {
      shifted = false;
      return;
    }

    if (key === "Alt") {
      alted = false;
      return;
    }
  });
  target.addEventListener("keydown", (event: KeyboardEvent) => {
    const { key } = event;
    if (!keyDowns.includes(key)) return;

    if (key === "Shift") {
      shifted = true;
      return;
    }

    if (key === "Alt") {
      alted = true;
      return;
    }

    if (key === "ArrowRight") {
      if (shifted) {
        this.direction = new Direction(
          this.direction.zx + 15,
          this.direction.y
        );
      } else {
        this.centre = new Point(
          this.centre.x + 1,
          this.centre.y,
          this.centre.z
        );
      }
    }

    if (key === "ArrowLeft") {
      if (shifted) {
        this.direction = new Direction(
          this.direction.zx - 15,
          this.direction.y
        );
      } else {
        this.centre = new Point(
          this.centre.x - 1,
          this.centre.y,
          this.centre.z
        );
      }
    }

    if (key === "ArrowUp") {
      if (shifted) {
        this.direction = new Direction(
          this.direction.zx,
          this.direction.y + 15
        );
      } else if (alted) {
        this.centre = new Point(
          this.centre.x,
          this.centre.y,
          this.centre.z + 1
        );
      } else {
        this.centre = new Point(
          this.centre.x,
          this.centre.y + 1,
          this.centre.z
        );
      }
    }

    if (key === "ArrowDown") {
      if (shifted) {
        this.direction = new Direction(
          this.direction.zx,
          this.direction.y - 15
        );
      } else if (alted) {
        this.centre = new Point(
          this.centre.x,
          this.centre.y,
          this.centre.z - 1
        );
      } else {
        this.centre = new Point(
          this.centre.x,
          this.centre.y - 1,
          this.centre.z
        );
      }
    }

    this.render();
  });
};
