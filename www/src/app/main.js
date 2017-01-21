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
		
		scoreDisplay,
		timer,
		
		canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d");
	
	/*
	private function initScoreDisplay():void {
		scoreDisplay = new TextField();
		scoreDisplay.x = Globals.STAGE_WIDTH / 2 - 40;
		scoreDisplay.y = 10;
		scoreDisplay.type = TextFieldType.DYNAMIC;

		var format:TextFormat = new TextFormat("Arial Black", 40, 0xFFFFFF);
		scoreDisplay.defaultTextFormat = format;

		scoreDisplay.appendText("0");
	}
*/
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
		/*
		obstacle1.reset();
		obstacle2.reset();
		obstacle3.reset();
		*/

		liveChars = 3;
		score = 0;
		//scoreDisplay.text = "0";
	}
	
	function endGame() {
		/*
		var newGameTimer:Timer = new Timer(3 * 1000, 1);
		newGameTimer.addEventListener(TimerEvent.TIMER_COMPLETE, newGame);
		newGameTimer.start();
		*/
		newGame();
	}
	
	function killChar(e) {
		liveChars -= 1;
		if (liveChars === 0) {
			endGame();
		}
	}
	
	function initChars() {
		char1 = new Char(10, Globals.STAGE_HEIGHT / 3 - Globals.DIVIDER_WIDTH, context);
		char2 = new Char(10, 2 * Globals.STAGE_HEIGHT / 3 - Globals.DIVIDER_WIDTH, context);
		char3 = new Char(10, 3 * Globals.STAGE_HEIGHT / 3 - Globals.DIVIDER_WIDTH, context);

		window.addEventListener("DIE", killChar);
	}
	
	function scorePoint(e) {
		score += liveChars;
		//scoreDisplay.text = ""+score;
	}
	
	function initObstacles() {
		obstacle1 = new Obstacle(1, char1);
		obstacle2 = new Obstacle(2, char2);
		obstacle3 = new Obstacle(3, char3);

		window.addEventListener("SCORE", scorePoint);
	}
	/*
	private function displayInstructions():void {
		var format:TextFormat = new TextFormat("Arial Black", 20, 0xFFFFFF);

		var z:TextField = new TextField();
		z.x = Globals.STAGE_WIDTH - 40;
		z.y = 100 * 0 + 40;
		z.type = TextFieldType.DYNAMIC;
		z.defaultTextFormat = format;

		z.appendText("Z");

		var x:TextField = new TextField();
		x.x = Globals.STAGE_WIDTH - 40;
		x.y = 150 * 1 + 40;
		x.type = TextFieldType.DYNAMIC;
		x.defaultTextFormat = format;

		x.appendText("X");

		var c:TextField = new TextField();
		c.x = Globals.STAGE_WIDTH - 40;
		c.y = 140 * 2 + 40;
		c.type = TextFieldType.DYNAMIC;
		c.defaultTextFormat = format;

		c.appendText("C");

		stage.addChild(z);
		stage.addChild(x);
		stage.addChild(c);
	}
*/
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
	
	function tick(e) {
		context.clearRect(0, 0, Globals.STAGE_WIDTH, Globals.STAGE_HEIGHT);
		drawSeperators();
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

		context.fillStyle = "#00DD00";
		context.fillRect(100, 100, 20, 20);

		drawSeperators();
		initChars();
		initObstacles();/*
		initScoreDisplay();
		displayInstructions();
		*/
		
		window.onkeyup = handleKeyUp;
		setInterval(tick, 1000 / Globals.CLOCK_SPEED);
	}
	
	constructor();
});
