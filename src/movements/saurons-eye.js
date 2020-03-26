
const movementBuffer = 5;
const increment = 1;

let coolingOff = false;
let timeout;

export const sauronsEye = function(
    element = this.element
){
    if (!(element instanceof Element)) {
        throw new Error("Cinnamon, sauronsEye, element -- You must pass a DOM/HTML element or undefined to the element argument.");
    }

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
            this.dir_zx += dx < -movementBuffer ? increment : -increment;
            if (this.dir_zx > 360) {
                this.dir_zx = 360 - this.dir_zx;
            }
            else if (this.dir_zx < 0) {
                this.dir_zx = 360 + this.dir_zx;
            }
        }
        else if (dy > movementBuffer || dy < -movementBuffer) {
            previouseMouse = {x:previouseMouse.x,y:event.clientY};
            if (this.dir_y < 90 || this.dir_zx > -90) {
                this.dir_y += dy < -movementBuffer ? -increment : increment;
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
    document.body.addEventListener("keyup",event=>{
        const key = event.which;
        if (key !== 37 && key !== 38 && key !== 39 && key !== 40) {
            return;
        }
        if (key === 37) {
            this.x--;
        }
        if (key === 39) {
            this.x++;
        }
        if (key === 38) {
            this.y--;
        }
        if (key === 40) {
            this.y++;
        }
        if (!coolingOff) {
            this.render();
            coolingOff = true;
            timeout = setTimeout(()=>{
                coolingOff = false;
            },1000/30);
        }
    });
}
