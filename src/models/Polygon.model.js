import { defaultColour } from "../constants/values";
import { ShapeEvent } from "./ShapeEvent.model";

export const Polygon = function(
    points = [],
    options = {
        colour: defaultColour,
        events: []
    }
){
    if (!(points instanceof Array)) {
        throw new Error("Cinnamon, Polygon, points -- You must pass an Array to the points argument.");
    }
    if (points.length < 3) {
        throw new Error(`Cinnamon, Polygon, points -- You must at least 3 points, you have passed ${points.length}.`);
    }
    if (!(options instanceof Object)) {
        throw new Error("Cinnamon, Polygon, options -- You must pass an Object or undefined to the options argument.");
    }
    if (options.events && !(options.events instanceof Array)) {
        throw new Error("Cinnamon, Polygon, options.events -- If you add an events property to the options object it must be an Array.");
    }

    const events = (options.events || []).filter(x=>{
        return x instanceof ShapeEvent;
    });

    if (events.length < (options.events || []).length) {
        console.warn(`Cinnamon, Polygon, options.events -- ${options.events.length - events.length} were filtered from this list because they were not instances of Cinnamon.ShapeEvent. Ensure your data is clean.`);
    }

    this.points = points;

    Object.defineProperty(this,"centre",{
        get(){
            const x = points.reduce((a,b)=>a+b.x,0)/points.length;
            const y = points.reduce((a,b)=>a+b.y,0)/points.length;
            const z = points.reduce((a,b)=>a+b.z,0)/points.length;
            return {x,y,z};
        }
    });
    Object.defineProperty(this,"ghostCentre",{
        get(){
            const x = points.reduce((a,b)=>a+b.ghost.x,0)/points.length;
            const y = points.reduce((a,b)=>a+b.ghost.y,0)/points.length;
            const z = points.reduce((a,b)=>a+b.ghost.z,0)/points.length;
            return {x,y,z};
        }
    });

    this.colour = options.colour;

    this.events = events;
    Object.freeze(this.events);

    if (options.marker !== undefined) {
        this.marker = options.marker;
    }

    Object.seal(this);
}
