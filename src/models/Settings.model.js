
import { Point } from "./Point.model";
import { Direction } from "./Direction.model";
import { Aperture } from "./Aperture.model";

export const Settings = function(
    originalPoint = new Point(),
    originalDirection = new Direction(),
    aperture = new Aperture()
){
    if (!(originalPoint instanceof Point)) {
        throw new Error("Cinnamon, Settings, originalPoint -- You must pass an instance of Cinnamon.Point as originalPoint argument.");
    }
    if (!(originalDirection instanceof Direction)) {
        throw new Error("Cinnamon, Settings, originalDirection -- You must pass an instance of Cinnamon.Direction as originalDirection argument.");
    }
    if (!(aperture instanceof Aperture)) {
        throw new Error("Cinnamon, Settings, aperture -- You must pass an instance of Cinnamon.Aperture as aperture argument.");
    }

    this.originalPoint = originalPoint;
    this.originalDirection = originalDirection;
    this.aperture = aperture;

    Object.seal(this);
}
