
import { get } from "sage-library";

import { loadElement } from "./load-element";
import { addDefaultSettings } from "./addDefaultSettings";

import { addPoints, addPolygons } from "./logic/addItems";

import { RADIANS } from "./constants/RADIANS";

import { render } from "./render/render";
import { reset } from "./render/reset";

import { Direction } from "./models/Direction.model";
import { Settings } from "./models/Settings.model";
import { Aperture } from "./models/Aperture.model";
import { Point } from "./models/Point.model";
import { Line } from "./models/Line.model";
import { Polygon } from "./models/Polygon.model";
import { ShapeEvent } from "./models/ShapeEvent.model";

// Movements
import { wipeWindows } from "./movements/wipe-windows";
import { sauronsEye } from "./movements/saurons-eye";
import { attentionCentre } from "./movements/attention-centre";

export { findIntersection as findPlaneIntersection, getPlaneFromThreePoints } from "./services/plane.service";
export { isPointBetweenLinePoints } from "./services/is-point-between-line-points.service";

export const Cinnamon = function(
    element,
    offset = 0
){
    this.element = null;

    if (element instanceof Element) {
        this.loadElement(element);
    }

    this.renderType = "svg";
    this.canvasContext = null;

    this.x = null;
    this.y = null;
    this.z = null;

    this.offset = offset;

    this.dir_zx = null;
    this.dir_y = null;

    this.aperture = null;

    this.points = [];
    this.lines = [];
    this.polygons = [];

    this.type = null;

    this.planes = null;

    Object.seal(this);
}

Cinnamon.Point = Point;
Cinnamon.Line = Line;
Cinnamon.Polygon = Polygon;

Cinnamon.ShapeEvent = ShapeEvent;

Cinnamon.Direction = Direction;
Cinnamon.Settings = Settings;
Cinnamon.Aperture = Aperture;
Cinnamon.RADIANS = RADIANS;

Cinnamon.prototype = new function CinnamonPrototype(){
    get(this,"width",function(){
        return this.element
            ? this.element.clientWidth
            : null;
    });
    get(this,"height",function(){
        return this.element
            ? this.element.clientHeight
            : null;
    });
    get(this,"relative",function(){
        return this.element
            ? this.width
            : null;
    });
    get(this,"centre",function(){
        return new Point(this.x,this.y,this.z);
    });

    this.loadElement = loadElement;
    this.addDefaultSettings = addDefaultSettings;
    this.addPoints = addPoints;
    this.addPolygons = addPolygons;
    this.render = render;
    this.reset = reset;
    this.addMovement = function(type) {
        if (type === "wipe-windows" || type === 1) {
            this.type = 1;
            wipeWindows.apply(this);
        }
        else if (type == "saurons eye" || type === 2) {
            this.type = 2;
            sauronsEye.apply(this);
        }
        else if (type == "attention centre" || type === 3) {
            this.type = 3;
            return attentionCentre.apply(this);
        }
    }
}
