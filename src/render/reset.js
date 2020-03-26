
import { getDistance } from "../logic/get-disance.logic";
import { getAngle } from "../logic/get-angle.logic";
import { getXY } from "../logic/get-xy.logic";

export const reset = function(){
    [
        ...this.points,
        ...this.lines.reduce((a,b)=>(a.push(b.a,b.b),a),[]),
        ...this.polygons.reduce((a,b)=>(a.push(...b.points),a),[])
    ]
    .forEach(point => {
        point.reset();

		point.ghost.x -= this.x;
        point.ghost.y -= this.y;
        point.ghost.z -= this.z;

/*  -- Type 1 --  */
        // const dx = Math.tan(this.dir_zx / RADIANS) * (point.ghost.z - this.z);
        // const dXz = Math.tan(this.dir_zx / RADIANS) * dx;

        // point.ghost.x += dx;
        // point.ghost.z -= dXz;

        // const dy = Math.tan(this.dir_y / RADIANS) * (point.ghost.z - this.z);
        // const dYz = Math.tan(this.dir_y / RADIANS) * dy;

        // point.ghost.y += dy;
        // point.ghost.z -= dYz;

/*  -- Type 2 --  */
        // const dx = Math.tan(this.dir_zx / RADIANS) * (point.ghost.z - this.z);
        // point.ghost.x += dx;
        // const dy = Math.tan(this.dir_y / RADIANS) * (point.ghost.z - this.z);
        // point.ghost.y += dy;

/*  -- Type 3 --  */
        // const distance = getDistance(new Point(this.x,this.y,this.z),point);
        // const dx = Math.sin(this.dir_zx / RADIANS) * distance;
        // const dz = Math.tan(this.dir_zx / RADIANS) * dx;
        // point.ghost.x -= dx;
        // point.ghost.z += distance - dx;

/*  -- Type 4 --  */
		{ // ZX
			const distance = getDistance({x:this.x,y:this.z},{x:point.ghost.x,y:point.ghost.z});
			const angle = getAngle({x:this.x,y:this.z},{x:point.ghost.x,y:point.ghost.z});
			const newAngle = angle - (this.dir_zx > 180 ? this.dir_zx - 360 : this.dir_zx);
			const {x,y} = getXY(newAngle,distance);
			if ((newAngle > 270 && newAngle < 360) || (newAngle > -90 && newAngle < 90)) {
				point.ghost.x = x;
			}
			else {
				point.ghost.x = -x;
			}
			if (newAngle > -90 && newAngle < 90) {
				point.ghost.z = y;
			}
			else {
				point.ghost.z = -y;
			}
		}
		{ // Y
			const distance = getDistance({x:this.z,y:this.y},{x:point.ghost.z,y:point.ghost.y});
			const angle = getAngle({x:this.y,y:this.z},{x:point.ghost.y,y:point.ghost.z});
			const newAngle = angle - this.dir_y;
			const {x,y} = getXY(newAngle,distance);
			point.ghost.z = y;
			point.ghost.y = x;
		}
		{
			const angleZX = getAngle({x:this.x,y:this.z},{x:point.ghost.x,y:point.ghost.z});
			const angleY = getAngle({x:this.y,y:this.z},{x:point.ghost.y,y:point.ghost.z});
			if (point.ghost.z < 0){
				point.ghost.negative = true;
			}
			if (angleZX > this.aperture.zx || angleZX < -this.aperture.zx) {
				point.ghost.negative = true;
			}
			if (angleY > this.aperture.y || angleY < -this.aperture.y) {
				point.ghost.negative = true;
			}
		}
    });
}
