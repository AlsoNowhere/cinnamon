import { getDimensions } from "../services/get-dimensions.service";
import { getLineDimensions } from "../services/get-line-dimensions.service";
import { addPointsAtEdgeOfView } from "../services/add-points-at-edge-of-view.service";
import { resolver } from "../logic/resolver.logic";
import { render } from "../logic/render.logic";
import { addEvents } from "../logic/events/add-events.logic";
import { reset } from "../logic/reset.logic";
import { Point } from "../models/Point.model";
import { Line } from "../models/Line.model";
import { Polygon } from "../models/Polygon.model";
import { Plane } from "../models/Plane.model";
import { Setup } from "../models/Setup.model";
import { Direction } from "../models/Direction.model";
import { Aperture } from "../models/Aperture.model";
import { CircleView } from "../models/CircleView.model";
import { CinnamonEvents } from "../enums/CinnamonEvents.enum";
declare const resize: () => void;
declare abstract class CinnamonBase {
    resize: typeof resize;
    resolver: typeof resolver;
    render: typeof render;
    addEvents: typeof addEvents;
    reset: typeof reset;
    getDimensions: typeof getDimensions;
    getLineDimensions: typeof getLineDimensions;
    addPointsAtEdgeOfView: typeof addPointsAtEdgeOfView;
    constructor();
}
export declare class Cinnamon extends CinnamonBase {
    target: SVGElement | HTMLCanvasElement;
    type: "svg" | "canvas";
    eventsList: Map<CinnamonEvents, () => void>;
    width: number;
    height: number;
    baseAperture: number;
    aperture: Aperture;
    centre: Point;
    direction: Direction;
    zeroZPlane: Plane;
    planes: Record<string, Plane>;
    plainers: Record<string, Plane>;
    points: Array<Point>;
    lines: Array<Line>;
    polygons: Array<Polygon>;
    circleView: null | CircleView;
    constructor(target: SVGElement | HTMLCanvasElement, setup?: Setup);
}
export {};
