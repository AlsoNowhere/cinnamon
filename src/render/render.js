
import { resolvePoint } from "../logic/resolve-point.logic";
import { getDistance3D } from "../logic/get-disance.logic";
import { Point } from "../models/Point.model";

export const render = function(){
    let str = ``;

    (this.type === 1 || this.type === 2) && this.reset();

// Sort polygons by the distance from the centre at the view point. This means that polygons that are further away are behind polygons that are closer.
    const sortedPolygons = this.polygons.sort((a,b)=>getDistance3D(b.ghostCentre,Point.centre)-getDistance3D(a.ghostCentre,Point.centre))
    sortedPolygons
        .forEach((polygon,index) => {
            if (!!polygon.points.find(x=>x.ghost.negative)) {
                return;                    
            }
            const colour = polygon.colour;
            const points = polygon.points.map(point=>{
                const {width, height} = resolvePoint(this.width,this.height,this.relative,this.aperture,point.ghost)||{};
                return `${width},${height}`;
            }).filter(x=>!x.includes("NaN")).join(" ");
            const styles = `fill:${colour};`;
            const marker = polygon.marker ? `data-marker="${polygon.marker}"` : "";
            str += `<polygon points="${points}" style="${styles}" id="${index}" ${marker} />`;
        });

    this.lines.forEach(line => {
        if (line.a.ghost.negative || line.b.ghost.negative) {
            return;                    
        }
        const colour = line.colour;
        const thickness = line.size;
        const {aWidth, aHeight} = resolvePoint(this.width,this.height,this.relative,this.aperture,line.a.ghost)||{};
        const {bWidth, bHeight} = resolvePoint(this.width,this.height,this.relative,this.aperture,line.b.ghost)||{};
        const styles = `stroke:${colour};stroke-width:${thickness};`;
        str += `<line x1="${aWidth}" y1="${aHeight}" x2="${bWidth}" y2="${bHeight}" style="${styles}" />`;
    });

    this.points.forEach(point => {
        if (point.ghost.negative) {
            return;                    
        }
        const colour = point.colour;
        const size = point.size;
        const {width, height} = resolvePoint(this.width,this.height,this.relative,this.aperture,point.ghost)||{};
        const styles = `fill:${colour};`;
        str += `<circle cx="${width}" cy="${height}" r="${size}" style="${styles}" />`;
    });

// Add these elements to the HTML.
    this.element.innerHTML = str;

// Add events to polygons.
    const polygons = [...this.element.getElementsByTagName("polygon")];
    polygons.forEach(element=>{
        const polygon = sortedPolygons[element.id];
        polygon.events.forEach(polygonEvent=>{
            element.addEventListener(
                polygonEvent.eventName,
                event => {
                    const result = polygonEvent.callback(polygon,this,event,element);
                    result !== false && this.render();
                }
            );
        });
    });
}
