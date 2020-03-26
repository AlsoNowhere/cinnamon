
import { RADIANS } from "../../constants/RADIANS";

var set_point = function(point,x,y,angle){
	var dx = point[x],
		dy = point[y],
		_angle = Math.atan(dx/dy) * RADIANS,
		d = _angle === 90
			? dx
			: dy / Math.cos(_angle / RADIANS),
		angle_angle = _angle + angle;
	if (angle_angle < 0) {
		angle_angle = 360 + angle_angle;
	}
	else if (angle_angle > 360) {
		angle_angle = angle_angle - 360;
	}
	point[x] = Math.sin(angle_angle/RADIANS) * d;
    point[y] = Math.cos(angle_angle/RADIANS) * d;
}

export var rotate = function(x,y,angle){
	[
        ...this.points,
        ...this.lines.reduce((a,b)=>(a.push(b.a,b.b),a),[]),
        ...this.polygons.reduce((a,b)=>(a.push(...b.points),a),[])
	]
	.forEach(point=>{
		set_point(point.ghost,x,y,angle);
	});
}
