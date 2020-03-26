
const movementBuffer = 5;
const increment = 1;

let coolingOff = false;
let timeout;

export const wipeWindows = function(
    element = this.element
){
    if (!(element instanceof Element)) {
        throw new Error("Cinnamon, wipeWindows, element -- You must pass a DOM/HTML element or undefined to the element argument.");
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
            this.x += dx < -movementBuffer ? increment : -increment;
        }
        else if (dy > movementBuffer || dy < -movementBuffer) {
            previouseMouse = {x:previouseMouse.x,y:event.clientY};
            this.y += dy < -movementBuffer ? increment : -increment;
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
    element.addEventListener("wheel",event=>{
        this.z += event.deltaY / 100;
        if (!coolingOff) {
            this.render();
            coolingOff = true;
            timeout = setTimeout(()=>{
                coolingOff = false;
            },1000/30);
        }
    });
}
