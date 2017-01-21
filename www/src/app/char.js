var Event = Event || null;
var define = define || null;
define(function (require) {
	"use strict";
	
	return function (startX, startY, owner) {
		var GRAVITY = 1,
			CHAR_WIDTH = 20,
			
			groundPos = startY,
			living = true,
			jumping = false,
			velocity = 0,
			
			x = startX,
			y = startY - CHAR_WIDTH,
			
			context = owner;
		
		
		this.jump = function () {
			if (!jumping && living) {
				jumping = true;
				velocity = -15;
				groundPos = y;
			}
		};
		
		function draw(colour) {
			context.fillStyle = colour;
			context.fillRect(x, y, CHAR_WIDTH, CHAR_WIDTH);
		}
		
		this.tick = function () {
			if (jumping) {
				velocity += GRAVITY;
				y += velocity;
				if (y >= groundPos) {
					y = groundPos;
					jumping = false;
				}
			}
			draw("#FFFFFF");
		};
		
		this.kill = function () {
			draw("#CC0000");
			jumping = false;
			living = false;
			window.dispatchEvent(new Event("DIE", { detail: null }));
		};
		
		this.reset = function () {
			draw("#FFFFFF");
			living = true;
		};
		
		draw("#FFFFFF");
	};
});