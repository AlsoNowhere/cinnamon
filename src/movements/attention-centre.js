
import { rotate } from "./events/rotate";
import { move } from "./events/move";
import { RADIANS } from "../constants/RADIANS";

const movementBuffer = 15;
const increment = 5;

let coolingOff = false;
let timeout;
let zx = 0;

const pivot = (scope,type,amount,distance) => {
    if (type === "left") {
		rotate.call(scope,"x","z",amount);
		move.call(scope,
			Math.sin(amount/RADIANS)*distance.z*-1,
			0,
			distance.z-Math.cos(amount/RADIANS)*distance.z
		);
	}
	if (type === "right") {
		rotate.call(scope,"x","z",-amount);
		move.call(scope,
			Math.sin(amount/RADIANS)*distance.z,
			0,
			distance.z-Math.cos(amount/RADIANS)*distance.z
		);
	}
	if (type === "down") {
		rotate.call(scope,"y","z",amount);
		move.call(scope,
			0,
			Math.sin(amount/RADIANS)*distance.z*-1,
			distance.z-Math.cos(amount/RADIANS)*distance.z
		);
	}
	if (type === "up") {
		rotate.call(scope,"y","z",-amount);
		move.call(scope,
			0,
			Math.sin(amount/RADIANS)*distance.z,
			distance.z-Math.cos(amount/RADIANS)*distance.z
		);
	}
}

export const attentionCentre = function() {

    const element = this.element;
    const distance ={
        z: this.offset
    };

    let mouseDown = false;
    let previouseMouse = null;

    element.addEventListener("mousedown",event=>{
        mouseDown = true;
        previouseMouse = {x:event.clientX,y:event.clientY}
    });
    element.addEventListener("mouseup",()=>{
        mouseDown = false;
        previouseMouse = null;
    });
    element.addEventListener("mousemove",event=>{
        if (!mouseDown) {
            return;
        }
        const dx = previouseMouse.x - event.clientX;
        const dy = previouseMouse.y - event.clientY
        if (dx > movementBuffer || dx < -movementBuffer) {
            previouseMouse = {x:event.clientX,y:previouseMouse.y};
// ZX
            dx < -movementBuffer ? (
                (zx += increment),
                pivot(this,"down",this.dir_y,distance),
                pivot(this,"left",increment,distance),
                pivot(this,"down",-this.dir_y,distance)
            )
            : (
                (zx -= increment),
                pivot(this,"down",this.dir_y,distance),
                pivot(this,"right",increment,distance),
                pivot(this,"down",-this.dir_y,distance)
            );
        }
        else if (dy > movementBuffer || dy < -movementBuffer) {
            previouseMouse = {x:previouseMouse.x,y:event.clientY};
// Y
            if ((this.dir_y < 90 && dy > -movementBuffer) || (this.dir_zx > -90 && dy < -movementBuffer)) {
                this.dir_y += dy < -movementBuffer ? -increment : increment;
                dy < -movementBuffer ? (
                    pivot(this,"down",increment,distance)
                )
                : (
                    pivot(this,"down",-increment,distance)
                );
            }
        }
        else {
            return;
        }
        if (!coolingOff) {
            this.render();
            coolingOff = true;
            timeout = setTimeout(()=>{
                coolingOff = false;
            },1000/30);
        }
    });

    this.element.addEventListener("wheel",event=>{
        this.offset += event.deltaY / 100;
        distance.z = this.offset;
        move.call(this,
			0,
			0,
			event.deltaY / 100
		);
        this.render();
    });

    return function(){
        const values = {
            zx,
            y: this.dir_y
        };
        pivot(this,"down",this.dir_y,distance);
        pivot(this,"left",-zx,distance);
        this.dir_y = 0;
        zx = 0;
        return function(){
            pivot(this,"right",-values.zx,distance);
            pivot(this,"up",values.y,distance);
            this.dir_y = values.y;
            zx = values.zx;
        }.bind(this);
    }.bind(this);
}
