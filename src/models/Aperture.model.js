
export const Aperture = function(
    zx = 45
){
    if (typeof zx !== "number") {
        throw new Error("Cinnamon, Aperture, zx -- You must pass a number to zx argument.");
    }

    this.zx = zx;
    this.y = 0;

    Object.seal(this);
}
