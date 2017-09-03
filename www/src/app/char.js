var CustomEvent = CustomEvent || null;
var define = define || null;
define(function (require) {
	"use strict";
	
	return function (startX, startY, owner) {
		var GRAVITY = 1,
			CHAR_WIDTH = 20,
			
			groundPos = startY,
			jumping = false,
			velocity = 0,
			colour = "#FFFFFF",
			
			
			context = owner;

		this.living = true;
		this.x = startX;
		this.y = startY - CHAR_WIDTH;

		
		this.jump = function () {
			if (!jumping && this.living) {
				jumping = true;
				velocity = -15;
				groundPos = this.y;
			}
		};
		
		this.draw = function () {
			context.fillStyle = colour;
			context.fillRect(this.x, this.y, CHAR_WIDTH, CHAR_WIDTH);
		};
		
		this.tick = function () {
			if (jumping) {
        velocity += GRAVITY;
        this.y += velocity;
				if (this.y >= groundPos) {
          this.y = groundPos;
          jumping = false;
        }
			}
		};

    function accellerate() {
    }
    
    function land() {
    }
		
		this.kill = function () {
			// event must dispatch before living changes
			var event = new CustomEvent("DIE", {detail: this});
			window.dispatchEvent(event);
			colour = "#CC0000";
			jumping = false;
			this.living = false;
		};
		
		this.reset = function () {
			colour = "#FFFFFF";
			this.living = true;
			jumping = false;
			this.y = startY - CHAR_WIDTH;
		};
	};
});