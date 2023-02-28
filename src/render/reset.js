
import { getDistance } from "../logic/get-disance.logic";
import { getAngle } from "../logic/get-angle.logic";
import { getXY } from "../logic/get-xy.logic";
import { RADIANS } from "../constants/RADIANS";

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

		// console.log("Reset A: ", point, point.ghost, this);

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

 // ZX
		{
			// const distance = getDistance({x:this.x,y:this.z},{x:point.ghost.x,y:point.ghost.z});
			// const angle = getAngle({x:this.x,y:this.z},{x:point.ghost.x,y:point.ghost.z});








			const distance = getDistance({x:0,y:0},{x:point.ghost.x,y:point.ghost.z});
			const angle = getAngle({x:0,y:0},{x:point.ghost.x,y:point.ghost.z});

			const newAngle = angle - (this.dir_zx > 180 ? this.dir_zx - 360 : this.dir_zx);
			const {x,y} = getXY(newAngle,distance);

			// console.log("Reset: ", point, point.ghost, x, newAngle);


			if (point.ghost.z < 0) {
				point.ghost.x = -x;
			}
			else {
				point.ghost.x = x;
			}

			// if ((newAngle >= 270 && newAngle <= 360) || (newAngle >= -90 && newAngle <= 90)) {
			// 	point.ghost.x = x;
			// }
			// else {
			// 	point.ghost.x = -x;
			// }

			// if (newAngle >= 270 && newAngle <= 360) {
			// 	point.ghost.x = x;
			// }
			// else if (newAngle >= 0 && newAngle <= 90) {
				// point.ghost.x = -x;
			// }
			// else if (newAngle <= 0 && newAngle >= -90) {
			// 	point.ghost.x = x;
			// }



			// if (newAngle > -90 && newAngle < 90) {
			if (point.ghost.z > -0.001) {
				point.ghost.z = y;
			}
			else {
				point.ghost.z = -y;
			}
		}


// Y
		{

			// const zx = Math.pow(Math.pow(point.ghost.z,2)+Math.pow(point.ghost.x,2),1/2);
			// const zxAngle = Math.acos(point.ghost.z / zx) * RADIANS;
			// const distance = getDistance({x:0,y:0},{x:zx,y:point.ghost.y});
			// const angle = getAngle({x:0,y:0},{x:zx,y:point.ghost.y});
			// const newAngle = angle - (this.dir_y > 180 ? this.dir_y - 360 : this.dir_y);
			// const {x,y} = getXY(newAngle,distance);

			// // point.ghost.z = Math.cos(zxAngle / RADIANS) * -x;
			// // point.ghost.x = Math.sin(zxAngle / RADIANS) * x * (point.ghost.x < 0 ? -1 : 1);

			// if (point.ghost.y > -0.001) {
			// 	point.ghost.y = y;
			// }
			// else {
			// 	point.ghost.y = -y;
			// }

		}


		{
			const distance = getDistance({x:0,y:0},{x:point.ghost.z,y:point.ghost.y});
			let angle = getAngle({x:0,y:0},{x:point.ghost.z,y:point.ghost.y});
			angle < 0 && (angle = 180 + angle);
			const newAngle = angle - this.dir_y;
			const {x,y} = getXY(newAngle,distance);
			// console.log("Y: ", distance, angle, getAngle({x:0,y:0},{x:point.ghost.z,y:point.ghost.y}), "|", point.ghost.z, point.ghost.y, "|", x, y, "||", this.dir_y);
			point.ghost.z = x * (point.ghost.z < 0 ? -1 : 1);
			point.ghost.y = y * (point.ghost.z < 0 ? -1 : 1);
		}
		{
			// const angleZX = getAngle({x:this.x,y:this.z},{x:point.ghost.x,y:point.ghost.z});
			// const angleY = getAngle({x:this.y,y:this.z},{x:point.ghost.y,y:point.ghost.z});

			const angleZX = getAngle({x:0,y:0},{x:point.ghost.x,y:point.ghost.z});
			const angleY = getAngle({x:0,y:0},{x:point.ghost.y,y:point.ghost.z});

			if (point.ghost.z < 0){
				point.ghost.negative = true;
			}
			if (angleZX > this.aperture.zx || angleZX < -this.aperture.zx) {
				point.ghost.negative = true;
			}
			if (angleY > this.aperture.y || angleY < -this.aperture.y) {
				point.ghost.negative = true;
			}

			// console.log("Reset B: ", point, point.ghost, angleZX, angleY, this);
		}
    });
}
