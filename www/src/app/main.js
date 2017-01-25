var define = define || null;
define(function (require) {
	"use strict";
	var Char = require("./char"),
		Obstacle = require("./obstacle"),
		Globals = require("./globals"),
		
		char1,
		char2,
		char3,
		
		obstacle1,
		obstacle2,
		obstacle3,
		
		liveChars = 3,
		score = 0,
		scoreText = "0",
		
		scoreDisplay,
		timer,
		
		canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d");

	function drawSeperators() {
		context.fillStyle = "#FFFFFF";
		context.fillRect(0, Globals.STAGE_HEIGHT / 3 - Globals.DIVIDER_WIDTH, Globals.STAGE_WIDTH, Globals.DIVIDER_WIDTH);
		context.fillRect(0, 2 * Globals.STAGE_HEIGHT / 3 - Globals.DIVIDER_WIDTH, Globals.STAGE_WIDTH, Globals.DIVIDER_WIDTH);
		context.fillRect(0, 3 * Globals.STAGE_HEIGHT / 3 - Globals.DIVIDER_WIDTH, Globals.STAGE_WIDTH, Globals.DIVIDER_WIDTH);
	}
	
	function newGame(e) {
		char1.reset();
		char2.reset();
		char3.reset();
		
		obstacle1.reset();
		obstacle2.reset();
		obstacle3.reset();

		liveChars = 3;
		score = 0;
		scoreText = "0";
	}
	
	function endGame() {
		setTimeout(newGame, 3 * 1000);
	}
	
	function killChar(e) {
		console.log(e.detail);
		if(e.detail.living) {
			liveChars -= 1;
		}
		if (liveChars === 0) {
			endGame();
		}
	}
	
	function initChars() {
		char1 = new Char(10, Globals.STAGE_HEIGHT / 3 - Globals.DIVIDER_WIDTH, context);
		char2 = new Char(10, 2 * Globals.STAGE_HEIGHT / 3 - Globals.DIVIDER_WIDTH, context);
		char3 = new Char(10, 3 * Globals.STAGE_HEIGHT / 3 - Globals.DIVIDER_WIDTH, context);
	}
	
	function scorePoint(e) {
		score += liveChars;
		scoreText = ""+score;
	}
	
	function initObstacles() {
		obstacle1 = new Obstacle(1, char1, context);
		obstacle2 = new Obstacle(2, char2, context);
		obstacle3 = new Obstacle(3, char3, context);
	}

	function handleKeyUp(e) {
		switch (e.keyCode) {
		case 90:
			char1.jump();
			break;
		case 88:
			char2.jump();
			break;
		case 67:
			char3.jump();
			break;
		}
	}
	
	function drawBackground() {
		context.clearRect(0, 0, Globals.STAGE_WIDTH, Globals.STAGE_HEIGHT);
	}
	
	function drawText(x, y, text, font, colour) {
		context.fillStyle = colour;
		context.font = font;
		context.fillText(text, x, y);
	}
	
	function drawScore() {
		drawText(Globals.STAGE_WIDTH / 2 - 40, 40, scoreText, "40px Arial Black", "white");
	}

	function drawInstructions() {
		drawText(Globals.STAGE_WIDTH - 40, 200 * 0 + 100, "Z", "20px Arial Black", "white");
		drawText(Globals.STAGE_WIDTH - 40, 200 * 1 + 100, "X", "20px Arial Black", "white");
		drawText(Globals.STAGE_WIDTH - 40, 200 * 2 + 100, "C", "20px Arial Black", "white");
	}
	
	function draw(e) {
		drawBackground();
		drawSeperators();
		drawScore();
		drawInstructions();
		
		char1.draw();
		char2.draw();
		char3.draw();
		
		obstacle1.draw();
		obstacle2.draw();
		obstacle3.draw();
	}
	
	function tick(e) {
		char1.tick();
		char2.tick();
		char3.tick();
		
		obstacle1.tick();
		obstacle2.tick();
		obstacle3.tick();
	}
	
	function constructor() {
		Globals.STAGE_HEIGHT = canvas.height;
		Globals.STAGE_WIDTH = canvas.width;

		initChars();
		initObstacles();

		window.addEventListener("SCORE", scorePoint);
		window.addEventListener("DIE", killChar);
		window.onkeyup = handleKeyUp;
		
		setInterval(tick, 1000 / Globals.CLOCK_SPEED);
		setInterval(draw, 1000 / Globals.FPS);
	}
	
	constructor();
});
