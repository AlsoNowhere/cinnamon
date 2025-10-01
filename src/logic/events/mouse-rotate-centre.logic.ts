import { Cinnamon } from "../../main/Cinnamon";

import { Point } from "../../models/Point.model";
import { CircleView } from "../../models/CircleView.model";

import { CinnamonEvents } from "../../enums/CinnamonEvents.enum";

export interface IMouseRotateCentreOptions {
  centre?: Point;
  distance?: number;
}

export const mouseRotateCentre = (
  cinnamon: Cinnamon,
  target: HTMLElement | SVGElement,
  options: IMouseRotateCentreOptions = {},
) => {
  if (!!cinnamon.eventsList.get(CinnamonEvents.MouseRotateCentre)) {
    console.error(`Cannot add the same Cinnamon events twice. ${CinnamonEvents.MouseRotateCentre}`);
    return;
  }

  const mouseLeftClickDown = {
    state: false,
    location: {
      x: null,
      y: null,
    },
  };

  cinnamon.circleView = new CircleView(options.centre, options.distance);
  cinnamon.centre = cinnamon.circleView.centre.clone({ z: -cinnamon.circleView.distance });
  cinnamon.direction = cinnamon.circleView.direction;
  cinnamon.render();

  const mousedown = (event: MouseEvent) => {
    const { button } = event;
    if (button !== 0) return;
    mouseLeftClickDown.state = true;
    mouseLeftClickDown.location.x = event.clientX;
    mouseLeftClickDown.location.y = event.clientY;
  };

  const mouseup = (event: MouseEvent) => {
    const { button } = event;
    if (button !== 0) return;
    mouseLeftClickDown.state = false;
    mouseLeftClickDown.location.x = null;
    mouseLeftClickDown.location.y = null;
  };

  const mousemove = (event: MouseEvent) => {
    const { button } = event;
    if (button !== 0) return;
    if (!mouseLeftClickDown.state) return;

    const deltaX = mouseLeftClickDown.location.x - event.clientX;
    const deltaY = mouseLeftClickDown.location.y - event.clientY;

    cinnamon.circleView.direction.zx += deltaX;
    const { zx } = cinnamon.circleView.direction;
    if (zx < 0) {
      cinnamon.circleView.direction.zx = 360 + zx;
    }
    if (zx > 360) {
      cinnamon.circleView.direction.zx = zx - 360;
    }
    cinnamon.circleView.direction.y += deltaY;
    const { y } = cinnamon.circleView.direction;
    if (y > 90) {
      cinnamon.circleView.direction.y = 90;
    }
    if (y < -90) {
      cinnamon.circleView.direction.y = -90;
    }

    cinnamon.centre = cinnamon.circleView.getCinnamonCentre();
    cinnamon.direction = cinnamon.circleView.direction;

    cinnamon.render();

    mouseLeftClickDown.location.x = event.clientX;
    mouseLeftClickDown.location.y = event.clientY;
  };

  const mousewheel = (event: WheelEvent) => {
    const { deltaY } = event;
    if (deltaY > 0) {
      cinnamon.circleView.distance += 10;
    } else if (deltaY < 0) {
      cinnamon.circleView.distance -= 10;
    }

    cinnamon.centre = cinnamon.circleView.getCinnamonCentre();
    cinnamon.render();
  };

  target.addEventListener("mousedown", mousedown);
  target.addEventListener("mouseup", mouseup);
  target.addEventListener("mousemove", mousemove);
  target.addEventListener("wheel", mousewheel, { passive: true });

  cinnamon.eventsList.set(CinnamonEvents.MouseRotateCentre, () => {
    cinnamon.eventsList.delete(CinnamonEvents.MouseRotateCentre);

    target.removeEventListener("mousedown", mousedown);
    target.removeEventListener("mouseup", mouseup);
    target.removeEventListener("mousemove", mousemove);
    target.removeEventListener("wheel", mousewheel);
  });
};
