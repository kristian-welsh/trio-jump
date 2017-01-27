var define = define || null;
define(function (require) {
	"use strict";
	var Char = require("./char"),
		Obstacle = require("./obstacle"),
		Globals = require("./globals"),
		Seperator = require("./seperator"),
		GameClock = require("./game-clock"),
		Score = require("./score"),
		
		char1,
		char2,
		char3,
		
		obstacle1,
		obstacle2,
		obstacle3,
    
		seperator1,
    seperator2,
		seperator3,
    
    scoreObj,
		
		liveChars = 3,
		score = 0,
		scoreText = "0",
		
		scoreDisplay,
		timer,
		
		canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d");
	
	
	function initChars() {
		char1 = new Char(10, Globals.STAGE_HEIGHT / 3 - Globals.DIVIDER_WIDTH, context);
		char2 = new Char(10, 2 * Globals.STAGE_HEIGHT / 3 - Globals.DIVIDER_WIDTH, context);
		char3 = new Char(10, 3 * Globals.STAGE_HEIGHT / 3 - Globals.DIVIDER_WIDTH, context);
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
	
	function scorePoint(e) {
		scoreObj.increaseScore(liveChars);
	}
  
	function newGame(e) {
		char1.reset();
		char2.reset();
		char3.reset();
		
		obstacle1.reset();
		obstacle2.reset();
		obstacle3.reset();
		score = 0;
		scoreText = "0";
    scoreObj.resetScore();
	}
	
	function endGame() {
		liveChars = 3;
		setTimeout(newGame, 3 * 1000);
	}
	
	function killChar(e) {
		if(e.detail.living) {
			liveChars -= 1;
		}
		if (liveChars === 0) {
			endGame();
		}
	}
	
	function constructor() {
		Globals.STAGE_HEIGHT = canvas.height;
		Globals.STAGE_WIDTH = canvas.width;

		initChars();
		initObstacles();
    
		seperator1 = new Seperator(1, context);
    seperator2 = new Seperator(2, context);
		seperator3 = new Seperator(3, context);
    
    scoreObj = new Score(context);

		window.addEventListener("SCORE", scorePoint);
		window.addEventListener("DIE", killChar);
		window.onkeyup = handleKeyUp;
    
    var drawable = [char1, char2, char3, obstacle1, obstacle2, obstacle3, seperator1, seperator2, seperator3, scoreObj];
    var tickable = [char1, char2, char3, obstacle1, obstacle2, obstacle3];
    
    
    var clock = new GameClock(drawable, tickable, context);
    
		clock.start();
	}
	
	constructor();
});
