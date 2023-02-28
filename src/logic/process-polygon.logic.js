
import { getCrossedConePoints } from "./get-cross-points.logic";
import { _isInsideCone } from "./is-inside-cone.logic";

export const processPolygon = (cinnamon,polygon) => {

    const outputPoints = [];
    const isInsideCone = _isInsideCone(cinnamon);

    polygon.points.forEach((point,index)=>{

        const nextPoint = polygon.points[index === (polygon.points.length - 1) ? 0 : index+1];

        if (isInsideCone(point.ghost)) {
            outputPoints.push(point.ghost);
        }

        if ((!isInsideCone(point.ghost) && isInsideCone(nextPoint.ghost)) || (isInsideCone(point.ghost) && !isInsideCone(nextPoint.ghost))) {
            outputPoints.push(...getCrossedConePoints(cinnamon,point.ghost,nextPoint.ghost));
            return;
        }

        if (!isInsideCone(point.ghost) && !isInsideCone(nextPoint.ghost)) {
            // outputPoints.push(...getCrossedOutsidePoints(cinnamon,point.ghost,nextPoint.ghost));
            outputPoints.push(...getCrossedConePoints(cinnamon,point.ghost,nextPoint.ghost));
            return;
        }






        // const angleZX = getAngle({x:0,y:0},{x:point.ghost.x,y:point.ghost.z});
        // const angleY = getAngle({x:0,y:0},{x:point.ghost.y,y:point.ghost.z});

        // if (angleZX < cinnamon.aperture.zx
        //     && angleZX > -cinnamon.aperture.zx
        //     && angleY < cinnamon.aperture.y
        //     && angleY > -cinnamon.aperture.y
        //     && point.ghost.z > -0.001
        // ) {
        //     // console.log("Not crossed: ", point.ghost);
        //     outputPoints.push(point.ghost);
        //     return;
        // }

        // const crossPoints = getCrossPoints(cinnamon,point.ghost,polygon.points,index);

        // console.log("Crossys: ", point.ghost, crossPoints);

        // outputPoints.push(...crossPoints);










    });

    polygon.renderPoints = outputPoints;

    return polygon;
}
