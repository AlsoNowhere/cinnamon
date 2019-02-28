
(function(){
	var p = window._cinn.p;
	var set_point = window._cinn.set_point;

	window._cinn.rotate = function(a,b,angle){
		this.points.forEach(function(point){
			set_point(point,a,b,angle);
		}.bind(this));
		this.lines.forEach(function(line){
			set_point(line.a,a,b,angle);
			set_point(line.b,a,b,angle);
		}.bind(this));
		this.polygons.forEach(function(polygon){
			polygon.points.forEach(function(point){
				set_point(point,a,b,angle);
			});
		}.bind(this));
	}
}());
