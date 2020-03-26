
import { defaultColour, defaultSize } from "../constants/values";

export const Point = function(
    x = 0,
    y = 0,
    z = 0,
    options = {
        colour: defaultColour,
        size: defaultSize
    }
){
    if (typeof x !== "number") {
        throw new Error("Cinnamon, Point, x -- You must pass a number to x argument.");
    }
    if (typeof y !== "number") {
        throw new Error("Cinnamon, Point, y -- You must pass a number to y argument.");
    }
    if (typeof z !== "number") {
        throw new Error("Cinnamon, Point, z -- You must pass a number to z argument.");
    }
    if (!(options instanceof Object)) {
        throw new Error("Cinnamon, Point, options -- You must pass an Object or undefined to the options argument.");
    }

    this.x = x;
    this.y = y;
    this.z = z;

    this.ghost = {x,y,z,negative:false};
    Object.seal(this.ghost);

    this.colour = options.colour || defaultColour;
    this.size = options.size || defaultSize;

    Object.freeze(this);
}

Point.centre = new Point(0,0,0);

Point.prototype = new function PointPrototype(){
    this.reset = function(){
        this.ghost.x = this.x;
        this.ghost.y = this.y;
        this.ghost.z = this.z;
        this.ghost.negative = false;
    }
    
    Object.freeze(this);
}
