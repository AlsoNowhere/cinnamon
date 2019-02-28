
(function(){

	var movement_move = window._cinn.movement_move;
	var movement_pivot = window._cinn.movement_pivot;

	window._cinn.set_events = function(type){
		// var x,
		// 	y,
		// 	delta = 5,
		// 	amount = 1,
		var moving = false,
			mousedown = false,
			time = 1000 / 300;
		var settings = {
			x: null,
			y: null,
			delta: 5,
			amount: 1,
		}
		this.display.addEventListener("mousedown",function(event){
			settings.x = event.clientX;
			settings.y = event.clientY;
			mousedown = true;
		}.bind(this));
		this.display.addEventListener("mousemove",function(event){
			// var dx,
			// 	dy;
			inner_settings = {
				dx: null,
				dy: null
			}
			if (!mousedown || moving) {
				return;
			}
			inner_settings.dx = event.clientX - settings.x;
			inner_settings.dy = event.clientY - settings.y;
			if (this.movement === "pivot") {
				movement_pivot.apply(this,[settings,inner_settings]);
			}
			else if (this.movement === "move") {
				movement_move.apply(this,[settings,inner_settings]);
			}
			this.render();
			moving = true;
			setTimeout(function(){
				moving = false;
			},time);
		}.bind(this));
		this.display.addEventListener("mouseup",function(){
			mousedown = false;
		}.bind(this));
	}
}());
