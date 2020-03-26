
import { RADIANS } from "../constants/RADIANS";

var get_angle = function(x,y,point){
	var angle = Math.atan(point[x] / point[y]) * RADIANS;
	return angle;
}

var get_point = function(_width,_height,_,aperture,point){
	if (point.z < 0) {
		return null;
	}
	var angleZX = get_angle("x","z",point);
	var angleYZ = get_angle("y","z",point) * -1;
	var w = (angleZX + aperture.zx / 2) / aperture.zx * _width;
	var h = (angleYZ + aperture.y / 2) / aperture.y * _height;
	return {
		width:w||0,
		height:h||0
	};
}

export const resolvePoint = (_width,_height,relative,aperture,point) => {
    return get_point(_width,_height,relative,aperture,point);
}

