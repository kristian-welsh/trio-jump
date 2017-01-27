var define = define || null;
define(function (require) {
	"use strict";
	var Globals = require("./globals");
	
	return function (drawable, tickable, context) {
  
    var CLOCK_SPEED = 60,
        FPS = 240,
        
        tickClock,
        drawClock;
	
    function drawBackground() {
      context.clearRect(0, 0, Globals.STAGE_WIDTH, Globals.STAGE_HEIGHT);
    }
    
    function drawText(x, y, text, font, colour) {
      context.fillStyle = colour;
      context.font = font;
      context.fillText(text, x, y);
    }

    function drawInstructions() {
      drawText(Globals.STAGE_WIDTH - 40, 200 * 0 + 100, "Z", "20px Arial Black", "white");
      drawText(Globals.STAGE_WIDTH - 40, 200 * 1 + 100, "X", "20px Arial Black", "white");
      drawText(Globals.STAGE_WIDTH - 40, 200 * 2 + 100, "C", "20px Arial Black", "white");
    }
		
		function draw(e) {
      drawBackground();
      
      drawInstructions();
      
      for(var i = 0; i < drawable.length; i++) {
        drawable[i].draw();
      }
		}
		
		function tick(e) {
      for(var i = 0; i < tickable.length; i++) {
        tickable[i].tick();
      }
		}
    
    this.start = function () {
      tickClock = setInterval(tick, 1000 / CLOCK_SPEED);
      drawClock = setInterval(draw, 1000 / FPS);
    };
    
    this.stop = function (){
      clearInterval(tickClock);
      clearInterval(drawClock);
    };
	};
});