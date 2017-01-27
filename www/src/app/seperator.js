var define = define || null;
define(function (require) {
	"use strict";
	var Globals = require("./globals");
	
	return function (lane, owner) {
		var WIDTH = Globals.DIVIDER_WIDTH,
      
			context = owner;
		
		
		this.draw = function () {
			context.fillStyle = "#FFFFFF";
      var y = lane * Globals.STAGE_HEIGHT / 3 - WIDTH;
      context.fillRect(0, y, Globals.STAGE_WIDTH, WIDTH);
		};
	};
});