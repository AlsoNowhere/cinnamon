
(function(){

	var feature = function(input){
		this.colour = input.colour || "#444";
	}
	var Point = function(input){
		feature.apply(this,[input]);
		this.x = input.x;
		this.y = input.y;
		this.z = input.z;
	}
	var Line = function(input){
		feature.apply(this,[input]);
		this.a = input.a;
		this.b = input.b;
	}
	var Polygon = function(input){
		feature.apply(this,[input]);
		this.points = input.points;
	}

	var Cincinati = function(input){
		var _aperture = input.aperture || 45;
		this.display = input.display;
		this.width = input.display.clientWidth;
		this.height = input.display.clientHeight;
		this.ratio = this.width / this.height;
		this.points = [];
		this.lines = [];
		this.polygons = [];
		this.Point = Point;
		this.Line = Line;
		this.Polygon = Polygon;
		this.movement = input.movement || "move";
		this.location = input.location || {x:0,y:0,z:0};
		this.render_run = input.render_run;

		(function(){
			if (this.display.nodeName === "CANVAS") {
				this.type = "canvas";
				this.d2 = this.display.getContext("2d");
				this.display.width = this.width;
				this.display.height = this.height;
			}
			if (this.display.nodeName === "svg") {
				this.type = "svg";
			}
			this.aperture = {
				zx: this.ratio > 1 ? _aperture : _aperture / this.ratio,
				y: this.ratio < 1 ? _aperture : _aperture / this.ratio
			}
			this.set_events();
		}.apply(this));
	}

	Cincinati.prototype = {
		p: window._cinn.p,
		distance: window._cinn.distance,
		render: window._cinn.render,
		move: window._cinn.move,
		rotate: window._cinn.rotate,
		pivot: window._cinn.pivot,
		set_events: window._cinn.set_events
	}

	window.Cincinati = Cincinati;

	delete window._cinn;
}());
