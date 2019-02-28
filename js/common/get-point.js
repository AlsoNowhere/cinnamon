
(function(){

	var p = window._cinn.p;
	var radians = window._cinn.radians;

	console.log("Cin: ", window._cinn);

	window._cinn.get_point = function(point){
		var angle = {};
		var along = p(0,0,point.z);
		var dx = point.x;
		var dz = point.z;
		var dy = point.y;
		angle.zx = Math.atan(dx/dz) * radians;
		angle.y = Math.atan(dy/dz) * radians;
		var w = (this.aperture.zx + angle.zx) / (this.aperture.zx * 2);
		var h = (this.aperture.y - angle.y) / (this.aperture.y * 2);
		return {
			w:w,
			h:h
		}
	};
}());
