
(function(){

	var radians = window._cinn.radians;

	window._cinn.pivot = function(type,input){
		if (type === "zx") {
			this.rotate("z","x",input);
			this.move(Math.sin(input/radians)*100*-1,0,(100-Math.cos(input/radians)*100)*-1);
		}
		else if (type === "y") {
			this.rotate("y","z",input);
			this.move(0,Math.sin(input/radians)*100,0);
		}
		// this.render();
	}
}());
