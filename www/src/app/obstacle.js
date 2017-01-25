var define = define || null;
var Math = Math || null;
define(function (require) {
	"use strict";
	var Globals = require("./globals");
	
	return function (lane, pairedChar, owner) {
		var WIDTH = 60,
			HEIGHT = 30,
			
			speed,
			
			x,
			y = lane * Globals.STAGE_HEIGHT / 3 - HEIGHT - Globals.DIVIDER_WIDTH,
			
			char = pairedChar,
			context = owner;
		
		
		this.draw = function () {
			context.fillStyle = "#FFFFFF";
			context.fillRect(x, y, WIDTH, HEIGHT);
		};
		
		this.tick = function () {
			x -= speed;
			if (x + WIDTH < 0) {
				this.reset();
				window.dispatchEvent(new Event("SCORE", { detail: null }));
			}
		};
		
		function randomBoundedNum(low, high) {
			return Math.random() * (high - low) + low;
		}
		
		this.reset = function () {
			speed = randomBoundedNum(5, 8);
			x = Globals.STAGE_WIDTH;
			y = lane * Globals.STAGE_HEIGHT / 3 - HEIGHT - Globals.DIVIDER_WIDTH;
		};
		
		this.reset();
	};
});