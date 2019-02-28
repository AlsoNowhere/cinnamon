
(function(){
	window._cinn.movement_pivot = function(settings,inner_settings){
		if (inner_settings.dx > settings.delta) {
			settings.x = event.clientX;
			this.pivot("zx",settings.amount);
		}
		else if (inner_settings.dx < -settings.delta) {
			settings.x = event.clientX;
			this.pivot("zx",-settings.amount);
		}
		if (inner_settings.dy > settings.delta) {
			settings.y = event.clientY;
			this.pivot("y",settings.amount);
		}
		else if (inner_settings.dy < -settings.delta) {
			settings.y = event.clientY;
			this.pivot("y",-settings.amount);
		}
	}
}());
