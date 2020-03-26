
export const Direction = function(
    dir_zx = 0,
    dir_y = 0
){
    if (typeof dir_zx !== "number") {
        throw new Error("Cinnamon, Direction, dir_zx -- You must pass a number to dir_zx argument.");
    }
    if (typeof dir_y !== "number") {
        throw new Error("Cinnamon, Direction, dir_y -- You must pass a number to dir_y argument.");
    }

    this.dir_zx = dir_zx;
    this.dir_y = dir_y;

    Object.freeze(this);
}
