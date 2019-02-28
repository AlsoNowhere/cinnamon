
(function(){

	var distance = window._cinn.distance;
	var get_point = window._cinn.get_point;
	var p = window._cinn.p;

	var average = function(type,points){
		var avg = 0;
		points.forEach(function(x){
			avg += x[type];
		});
		avg /= points.length;
		return avg;
	}

	window._cinn.render = function(){
		var d1 = Date.now();
		var points = this.points;
		var polygons = this.polygons.map(function(x){
			x.centre = {x:average("x",x.points),y:average("y",x.points),z:average("z",x.points)};
			// points.push({x:x.centre.x,y:x.centre.y,z:x.centre.z, colour:"#ddd"});
			// console.log("Distance: ", this.location,x.centre);
			x.distance = distance(this.location,x.centre);
			return x;
		}.bind(this)).sort(function(a,b){
			return b.distance - a.distance;
		});

		// console.log("Position: ",
		// 	Math.round(this.location.x),
		// 	Math.round(this.location.y),
		// 	Math.round(this.location.z),
		// 	this.points,
		// 	polygons
		// 	// this.points
		// );

// Canvas element
		if (this.type === "canvas") {
			this.d2.clearRect(0,0,this.width,this.height);
			polygons.forEach(function(polygon){
				this.d2.fillStyle = polygon.colour || "#444";
				this.d2.beginPath();
				polygon.points.forEach(function(_point,i){
					var point = get_point.apply(this,[_point]);
					if (i===0) {
						this.d2.moveTo(point.w*this.width,point.h*this.height);
					}
					else {
						this.d2.lineTo(point.w*this.width,point.h*this.height);
					}
				}.bind(this));
				this.d2.closePath();
				this.d2.fill();
			}.bind(this));
			this.lines.forEach(function(line){
				var line_a = get_point.apply(this,[line.a]),
					line_b = get_point.apply(this,[line.b]);
				this.d2.beginPath();
				this.d2.moveTo(line_a.w*this.width,line_a.h*this.height);
				this.d2.lineTo(line_b.w*this.width,line_b.h*this.height);
				this.d2.stroke();
			}.bind(this));
			this.points.forEach(function(_point){
				var point = get_point.apply(this,[_point]);
				this.d2.fillRect(point.w*this.width,point.h*this.height,2,2);
			}.bind(this));
		}
// SVG element
		else if (this.type === "svg") {
			var str = '';
			polygons.forEach(function(x){
				var points = '';
				x.points.forEach(function(y,i){
					var point = get_point.apply(this,[y]);
					points += (i===0?'':' ') + (point.w*this.width) + ',' + (point.h*this.height);
				}.bind(this));
				str += '<polygon points="'+points+'" style="fill:'+(x.colour||'#000')+'" />';
			}.bind(this));
			this.lines.forEach(function(x){
				var line_a = get_point.apply(this,[x.a]),
					line_b = get_point.apply(this,[x.b]);
				str += '<line x1="'+(line_a.w*this.width)+'" y1="'+(line_a.h*this.height)+'" x2="'+(line_b.w*this.width)+'" y2="'+(line_b.h*this.height)+'" style="stroke:'+(x.colour||'#000')+';stroke-width:1px" />';
			}.bind(this));
			this.points.forEach(function(x){
				if (!x.hasOwnProperty("actual")) {
					x.actual = p(x.x,x.y,x.z);
				}
				// console.log("Point: ", x);
				var point = get_point.apply(this,[x]);
				if (isNaN(point.w) || isNaN(point.h)) { return; }
				str += '<circle cx="'+(point.w*this.width)+'" cy="'+(point.h*this.height)+'" r="3" style="fill:'+(x.colour||'#000')+'" />';
			}.bind(this));
			this.display.innerHTML = str;
		}

// Shows time taken to render images
		// console.log("Time taken: ", Date.now() - d1);

		if (this.render_run !== undefined) {
			this.render_run();
		}

	}
}());
