
import { Point } from "../models/Point.model";
import { Polygon } from "../models/Polygon.model";

export const addPoints = function(
    points
){
    if (!(points instanceof Array)) {
        throw new Error("Cinnamon, addPoints, points -- You must pass an Array to the points argument.");
    }

    const filtered = points.filter(x => x instanceof Point);

    if (filtered.length < points.length) {
        console.warn(`${points.length - filtered.length}/${points.length} points were filtered out because they were not instances of Cinnamon.Point. Please clean your data.`);
    }

    this.points.push(...filtered);

    return this;
}

export const addPolygons = function(
    polygons
){
    if (!(polygons instanceof Array)) {
        throw new Error("Cinnamon, addPolygons, polygons -- You must pass an Array to the polygons argument.");
    }

    const filtered = polygons.filter(x => x instanceof Polygon);

    if (filtered.length < polygons.length) {
        console.warn(`${polygons.length - filtered.length}/${polygons.length} polygons were filtered out because they were not instances of Cinnamon.Polygon. Please clean your data.`);
    }

    this.polygons.push(...filtered);

    return this;
}
