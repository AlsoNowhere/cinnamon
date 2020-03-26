
import { Settings } from "./models/Settings.model";

export const addDefaultSettings = function(
    settings = new Settings()
) {
    if (!(settings instanceof Settings)) {
        throw new Error("Cinnamon, addDefaultSettings, settings -- You must pass an instance of Settings to settings argument.");
    }

    this.x = settings.originalPoint.x;
    this.y = settings.originalPoint.y;
    this.z = settings.originalPoint.z;

    this.dir_zx = settings.originalDirection.dir_zx;
    this.dir_y = settings.originalDirection.dir_y;

    this.aperture = settings.aperture;
    this.aperture.y = this.aperture.zx * this.height / this.width;

    return this;
}
