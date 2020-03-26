
import { resolveZX, resolveY } from "../render/resolve";
import { centre } from "../constants/centre";

export const resolvePoint = (_width,_height,relative,aperture,point) => {

    let zx = resolveZX(centre,point);
    let y = resolveY(centre,point);

    const width = _width / 2 + zx / aperture.zx * relative / 2;
    const height = _height / 2 - y / aperture.zx * relative / 2;

    return {
        width,
        height
    };
}
