import { Cinnamon } from "../../main/Cinnamon";
import { Point } from "../../models/Point.model";
export interface IMouseRotateCentreOptions {
    centre?: Point;
    distance?: number;
}
export declare const mouseRotateCentre: (cinnamon: Cinnamon, target: HTMLElement | SVGElement, options?: IMouseRotateCentreOptions) => void;
