
import { lineout } from "./constants/values";
import { RADIANS } from "./constants/RADIANS";

import { getPlane } from "./services/plane.service";

import { Settings } from "./models/Settings.model";
import { Point } from "./models/Point.model";

export const addDefaultSettings = function(
    settings = new Settings()
) {
    if (!(settings instanceof Settings)) {
        throw new Error("Cinnamon, addDefaultSettings, settings -- You must pass an instance of Settings to settings argument.");
    }

    this.renderType = settings.type;
    
    if (settings.type === "canvas") {
        this.canvasContext = this.element.getContext("2d");
        this.element.width = window.innerWidth;
        this.element.height = window.innerHeight;
    }
    
    if (settings.type === "webgl") {
        this.canvasContext = this.element.getContext("webgl");
        this.element.width = window.innerWidth;
        this.element.height = window.innerHeight;
    }

    this.x = settings.originalPoint.x;
    this.y = settings.originalPoint.y;
    this.z = settings.originalPoint.z;

    this.dir_zx = settings.originalDirection.dir_zx;
    this.dir_y = settings.originalDirection.dir_y;

    this.aperture = settings.aperture;
    this.aperture.y = this.aperture.zx * this.height / this.width;

    this.planes = {
        top: getPlane(
            {x:0,y:-lineout,z:Math.tan(this.aperture.y / RADIANS) * lineout},
            new Point(0,0,0)
        ),
        bottom: getPlane(
            {x:0,y:lineout,z:Math.tan(this.aperture.y / RADIANS) * lineout},
            new Point(0,0,0)
        ),
        left: getPlane(
            {x:lineout,y:0,z:Math.tan(this.aperture.zx / RADIANS) * lineout},
            new Point(0,0,0)
        ),
        right: getPlane(
            {x:-lineout,y:0,z:Math.tan(this.aperture.zx / RADIANS) * lineout},
            new Point(0,0,0)
        )
    };

    return this;
}
