import { IMouseRotateCentreOptions } from "./mouse-rotate-centre.logic";
import { CinnamonEvents } from "../../enums/CinnamonEvents.enum";
type TAddEvents = {
    type: CinnamonEvents.DirectionGrid;
    target?: HTMLElement | SVGElement;
    options?: never;
} | {
    type: CinnamonEvents.MouseRotateCentre;
    target?: HTMLElement | SVGElement;
    options?: IMouseRotateCentreOptions;
};
export declare const addEvents: ({ type, target, options }: TAddEvents) => void;
export {};
