import { Cinnamon } from "../../main/Cinnamon";

import { directionGrid } from "./direction-grid.logic";
import { IMouseRotateCentreOptions, mouseRotateCentre } from "./mouse-rotate-centre.logic";

import { conditionKeys } from "../../data/constants.data";
import { keys } from "../../data/variables.data";

import { CinnamonEvents } from "../../enums/CinnamonEvents.enum";

type TAddEvents =
  | {
      type: CinnamonEvents.DirectionGrid;
      target?: HTMLElement | SVGElement;
      options?: never;
    }
  | {
      type: CinnamonEvents.MouseRotateCentre;
      target?: HTMLElement | SVGElement;
      options?: IMouseRotateCentreOptions;
    };

export const addEvents = function ({ type, target, options }: TAddEvents) {
  const cinnamon = this as Cinnamon;

  target = target ?? cinnamon.target;

  target.addEventListener("keydown", (event: KeyboardEvent) => {
    const { key } = event;
    if (!conditionKeys.includes(key)) return;
    keys[key] = true;
  });

  target.addEventListener("keyup", (event: KeyboardEvent) => {
    const { key } = event;
    if (!conditionKeys.includes(key)) return;
    keys[key] = false;
  });

  if (type === CinnamonEvents.DirectionGrid) {
    directionGrid(cinnamon, target);
  }

  if (type === CinnamonEvents.MouseRotateCentre) {
    mouseRotateCentre(cinnamon, target, options);
  }
};
