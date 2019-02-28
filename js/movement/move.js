
(function(){
	window._cinn.move = function(x,y,z){
		if (x === undefined) x = 0;
		if (y === undefined) y = 0;
		if (z === undefined) z = 0;
		this.points.forEach(function(point){
			point.x += x;
			point.y += y;
			point.z += z;
		});
		this.lines.forEach(function(line){
			line.a.x += x;
			line.a.y += y;
			line.a.z += z;
			line.b.x += x;
			line.b.y += y;
			line.b.z += z;
		});
		this.polygons.forEach(function(polygon){
			polygon.points.forEach(function(point){
				point.x += x;
				point.y += y;
				point.z += z;
			});
		});
		this.location.x -= x;
		this.location.y -= y;
		this.location.z -= z;
	}	
}());
