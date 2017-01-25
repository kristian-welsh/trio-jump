var define = define || null;
var Math = Math || null;
var Event = Event || null;
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
		
		function collide() {
			if (x < char.x + 20 && x + WIDTH > char.x && char.y + 20 > y) {
				char.kill();
				speed = 0;
			}
		}
		
		this.tick = function () {
			console.log(x);
			x -= speed;
			if (x + WIDTH < 0) {
				this.reset();
				window.dispatchEvent(new Event("SCORE", { detail: null }));
			}
			collide();
		};
		
		function randomBoundedNum(low, high) {
			return Math.random() * (high - low) + low;
		}
		
		this.reset = function () {
			x = Globals.STAGE_WIDTH;
			speed = randomBoundedNum(5, 8);
		};
		
		this.reset();
	};
});