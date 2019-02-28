
(function(){
	window._cinn.movement_move = function(settings,inner_settings){
		if (inner_settings.dx > settings.delta) {
			settings.x = event.clientX;
			this.move(settings.amount,0,0);
		}
		else if (inner_settings.dx < -settings.delta) {
			settings.x = event.clientX;
			this.move(-settings.amount,0,0);
		}
		if (inner_settings.dy > settings.delta) {
			settings.y = event.clientY;
			this.move(0,settings.amount,0);
		}
		else if (inner_settings.dy < -settings.delta) {
			settings.y = event.clientY;
			this.move(0,-settings.amount,0);
		}
	}
}());
