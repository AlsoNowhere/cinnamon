import { Point } from "./Point.model";
import { defaultColour, defaultSize } from "../constants/values";

export const Line = function(
    a,
    b,
    options = {
        colour: defaultColour,
        thickness: defaultSize
    }
){
    if (!(a instanceof Point)) {
        throw new Error("Cinnamon, Line, a -- You must pass an instance of Cinnamon.Point for the argument a.");
    }
    if (!(b instanceof Point)) {
        throw new Error("Cinnamon, Line, b -- You must pass an instance of Cinnamon.Point for the argument b.");
    }
    if (!(options instanceof Object)) {
        throw new Error("Cinnamon, Line, options -- You must pass an Object or undefined to the options argument.");
    }

    this.a = a;
    this.b = b;

    this.colour = options.colour || defaultColour;
    this.thickness = options.thickness || defaultSize;

    Object.freeze(this);

}
