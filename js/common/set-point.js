
(function(){

	var p = window._cinn.p;
	var radians = window._cinn.radians;
	var distance = window._cinn.distance;

	window._cinn.set_point = function(point,a,b,angle){
		var along = p(0,0,point[a]),
			dy = point[a],
			dx = point[b],
			_angle = Math.atan(dx/dy) * radians,
			angle_angle,
			x,
			y,
			z,
			r;
		if (dy < 0) {
			_angle = 180 + _angle;
		}
		else if (dx < 0) {
			_angle = 360 + _angle;
		}
		angle_angle = angle + _angle;
		if (angle_angle > 360) {
			angle_angle -= 360;
		}
		x = b === "x" ? point[b] : 0;
		y = a === "y" ? point[a] : 0;
		z = a === "z" ? point[a] : b === "z" ? point[b] : 0;
		r = distance(p(x,y,z),p(0,0,0));
		point[b] = Math.sin(angle_angle / radians) * r;
		point[a] = Math.cos(angle_angle / radians) * r;
	};

}());
