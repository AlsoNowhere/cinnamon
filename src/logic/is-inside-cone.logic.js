
import { getAngle } from "./get-angle.logic";

export const _isInsideCone = cinnamon => point => {
    const angleZX = getAngle({x:0,y:0},{x:point.x,y:point.z});
    const angleY = getAngle({x:0,y:0},{x:point.y,y:point.z});

    return angleZX < cinnamon.aperture.zx
        && angleZX > -cinnamon.aperture.zx
        && angleY < cinnamon.aperture.y
        && angleY > -cinnamon.aperture.y
        && point.z > 0;
}
