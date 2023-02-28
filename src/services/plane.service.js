
import { Plane } from "../models/Plane.model";
import { Point } from "../models/Point.model";

export const getPlane = (normal,point) => new Plane(
    normal.x,normal.y,normal.z,
    normal.x * point.x + normal.y * point.y + normal.z * point.z
);

export const findIntersection = (plane,line) => {
    let t = (
        plane.d
        - plane.x * line.parametric.x.c
        - plane.y * line.parametric.y.c
        - plane.z * line.parametric.z.c
    )
    / (
        plane.x * line.parametric.x.t
        + plane.y * line.parametric.y.t
        + plane.z * line.parametric.z.t
    );

    if (t === Infinity) {
        t = 1000000;
    }


    return new Point(
        line.parametric.x.c + t * line.parametric.x.t,
        line.parametric.y.c + t * line.parametric.y.t,
        line.parametric.z.c + t * line.parametric.z.t,
    );
}

export const getPlaneFromThreePoints = (A,B,C) => {
    // const AB = {x:B.x-A.x,y:B.y-A.y,z:B.z-A.z};
    // const AC = {x:C.x-A.x,y:C.y-A.y,z:C.z-A.z};

    const a = (B.y-A.y) * (C.z-A.z)-(C.y-A.y) * (B.z-A.z);
    const b = (B.z-A.z) * (C.x-A.x)-(C.z-A.z) * (B.x-A.x);
    const c = (B.x-A.x) * (C.y-A.y)-(C.x-A.x) * (B.y-A.y);
    const d = -(a * A.x + b * A.y + c * A.z);
    return new Plane(a,b,c,d);
}
// getPlaneFromThreePoints(
//     {x:1,y:2,z:-2},
//     {x:3,y:-2,z:1},
//     {x:5,y:1,z:-4},
// );
