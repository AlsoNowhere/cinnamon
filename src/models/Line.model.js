
import { defaultColour, defaultSize } from "../constants/values";

import { getDistance3D } from "../logic/get-disance.logic";

import { Point } from "./Point.model";

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

    this.parametric = function(){
        const difference = {
            x: b.x-a.x,
            y: b.y-a.y,
            z: b.z-a.z
        }
        const x = {c:a.x,t:difference.x};
        const y = {c:a.y,t:difference.y};
        const z = {c:a.z,t:difference.z};
        return {x,y,z};
    }();

    this.distance = getDistance3D(a, b);

    this.colour = options.colour || defaultColour;
    this.thickness = options.thickness || defaultSize;

    Object.freeze(this);

}
