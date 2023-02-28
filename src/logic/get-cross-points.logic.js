
import { RADIANS } from "../constants/RADIANS";

import { findIntersection, getPlane } from "../services/plane.service";

import { getDistance3D } from "./get-disance.logic";

import { Point } from "../models/Point.model";
import { Line } from "../models/Line.model";
import { getAngle } from "./get-angle.logic";



// const lineout = 10;

// export const getCrossPoints = (cinnamon,point,polygonPoints,index) => {

//     const arr = [];

//     const lineA = {
//         start: point,
//         end: polygonPoints[index === (polygonPoints.length - 1) ? 0 : (index + 1)].ghost
//     };
//     const lineB = {
//         start: point,
//         end: polygonPoints[index === 0 ? (polygonPoints.length - 1) : (index - 1)].ghost
//     };

//     const line1 = new Line(
//         new Point(lineA.start.x,lineA.start.y,lineA.start.z),
//         new Point(lineA.end.x,lineA.end.y,lineA.end.z),
//     );
//     const line2 = new Line(
//         new Point(lineB.start.x,lineB.start.y,lineB.start.z),
//         new Point(lineB.end.x,lineB.end.y,lineB.end.z),
//     );

//     const views = {
//         top: getPlane(
//             {x:0,y:-lineout,z:Math.tan(cinnamon.aperture.y / RADIANS) * lineout},
//             new Point(0,0,0)
//         ),
//         bottom: getPlane(
//             {x:0,y:lineout,z:Math.tan(cinnamon.aperture.y / RADIANS) * lineout},
//             new Point(0,0,0)
//         ),
//         left: getPlane(
//             {x:lineout,y:0,z:Math.tan(cinnamon.aperture.zx / RADIANS) * lineout},
//             new Point(0,0,0)
//         ),
//         right: getPlane(
//             {x:-lineout,y:0,z:Math.tan(cinnamon.aperture.zx / RADIANS) * lineout},
//             new Point(0,0,0)
//         )
//     }

//     // console.log("Points 1: ", index, point, polygonPoints, polygonPoints.map(x=>x.ghost));
//     // console.log("Points 2: ", index === (polygonPoints.length - 1) ? 0 : (index + 1), polygonPoints[index === (polygonPoints.length - 1) ? 0 : (index + 1)].ghost);
//     // console.log("Points 3: ", index === 0 ? (polygonPoints.length - 1) : (index - 1), polygonPoints[index === 0 ? (polygonPoints.length - 1) : (index - 1)].ghost);

//     Object.entries(views).forEach(view=>{
//         [line2,line1].forEach(line=>{
//             const intersect = findIntersection(view[1],line);
//             const a = getDistance3D(line.a,intersect);
//             const b = getDistance3D(line.b,intersect);

//             // console.log("Intersects: ", view[0], line.b, intersect);

//             if (
//                 a > line.distance
//                 || b > line.distance
//                 || isNaN(intersect.x)
//                 || isNaN(intersect.y)
//                 || isNaN(intersect.z)
//             ) {
//                 return;
//             }

//             const angleZX = getAngle({x:0,y:0},{x:intersect.x,y:intersect.z});
//             const angleY = getAngle({x:0,y:0},{x:intersect.y,y:intersect.z});

//             if (Math.round(angleZX*1000)/1000 > Math.round(cinnamon.aperture.zx*1000)/1000
//                 || Math.round(angleZX*1000)/1000 < -Math.round(cinnamon.aperture.zx*1000)/1000
//                 || Math.round(angleY*1000)/1000 > Math.round(cinnamon.aperture.y*1000)/1000
//                 || Math.round(angleY*1000)/1000 < -Math.round(cinnamon.aperture.y*1000)/1000
//             ) {
//                 return;
//             }

//             // console.log("Meta: ", view[0], intersect, view[1], line.a, line.b);
//             // console.log("UR point: ", intersect, line.a, line.b);

//             arr.push(intersect);
//         });
//     });

//     // console.log("Out: ", arr);

//     return arr;
// }

export const getCrossedConePoints = (cinnamon,point,nextPoint) => {
    const arr = [];
    const lineA = {
        start: point,
        end: nextPoint
    };
    const line = new Line(
        new Point(lineA.start.x,lineA.start.y,lineA.start.z),
        new Point(lineA.end.x,lineA.end.y,lineA.end.z),
    );
    Object.entries(cinnamon.planes).forEach(view=>{
        const intersect = findIntersection(view[1],line);
        const a = getDistance3D(line.a,intersect);
        const b = getDistance3D(line.b,intersect);
        if (
            a > line.distance
            || b > line.distance
            || isNaN(intersect.x)
            || isNaN(intersect.y)
            || isNaN(intersect.z)
        ) {
            return;
        }
        const angleZX = getAngle({x:0,y:0},{x:intersect.x,y:intersect.z});
        const angleY = getAngle({x:0,y:0},{x:intersect.y,y:intersect.z});
        if (Math.round(angleZX*1000)/1000 > Math.round(cinnamon.aperture.zx*1000)/1000
            || Math.round(angleZX*1000)/1000 < -Math.round(cinnamon.aperture.zx*1000)/1000
            || Math.round(angleY*1000)/1000 > Math.round(cinnamon.aperture.y*1000)/1000
            || Math.round(angleY*1000)/1000 < -Math.round(cinnamon.aperture.y*1000)/1000
            || intersect.z < 0
        ) {
            return;
        }

        arr.push(intersect);
    });
    return arr.sort((a,b)=>{
        return getDistance3D(point,b) < getDistance3D(point,a);
    }).map(x=>{
        return x;
    })
}

export const getCrossedOutsidePoints = () => {
    return [];
}
