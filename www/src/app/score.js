var define = define || null;
define(function (require) {
	"use strict";
	var Globals = require("./globals");
	
	return function (context) {
		var score = 0;
    
    function drawText(x, y, text, font, colour) {
      context.fillStyle = colour;
      context.font = font;
      context.fillText(text, x, y);
    }
		
		this.draw = function () {
      drawText(Globals.STAGE_WIDTH / 2 - 40, 40, score, "40px Arial Black", "white");
		};
    
    this.increaseScore = function (amount) {
      score += amount;
    };
    
    this.resetScore = function () {
      score = 0;
    };
	};
});