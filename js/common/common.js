
(function(){

	window._cinn.radians = 180 / Math.PI;

	window._cinn.distance = function(a,b){
		var _ = Math.pow;
		return _(_(b.x-a.x,2)+_(b.y-a.y,2)+_(b.z-a.z,2),1/2);
	};

	window._cinn.p = function(x,y,z){
		return {x:x,y:y,z:z};
	};

}());
