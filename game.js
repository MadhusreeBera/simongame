
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(".btn").click( function() {
	var userChosenColour = $(this).attr("id");
	makeSound(userChosenColour);
	animatePress(userChosenColour);
	userClickedPattern.push(userChosenColour);
	console.log("userClickedPattern: " + userClickedPattern);
	checkAnswer(userClickedPattern.length - 1);
});



function makeSound(buttonID){
	switch(buttonID){
		case "green":
			var green = new Audio("sounds/green.mp3");
			green.play();
			break;

		case "red":
			var red = new Audio("sounds/red.mp3");
			red.play();
			break;

		case "yellow":
			var yellow = new Audio("sounds/yellow.mp3");
			yellow.play();
			break;

		case "blue":
			var blue = new Audio("sounds/blue.mp3");
			blue.play();
			break;

		case "wrong":
			var wrong = new Audio("sounds/wrong.mp3");
			wrong.play();
			break;

		default:
			console.log(buttonID);
	}
}

function animatePress(currentColor){
	$("#" + currentColor).addClass("pressed");
	setTimeout( function(){
		$("#" + currentColor).removeClass("pressed");
	} , 100 );
}

$(document).on("keydown", function(){
	if(started === false){
		started = true;
		$("#level-title").text("Level " + level);
		nextSequence();
	}
});

$("#start-button").click( function(){
	if(started === false){
		started = true;
		$("#level-title").text("Level " + level);
		nextSequence();
	}
});

function checkAnswer(currentLevel){
	if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
		// console.log("success");
		if(currentLevel == gamePattern.length - 1){
			setTimeout( "nextSequence()" , 1000);
			userClickedPattern = [];
		}
	}
	else{
		// console.log("wrong"); 
		makeSound("wrong");
		$("#level-title").text("Game Over at level " + level + ", Press Any Key / Play button to Restart"); 
		$("body").addClass("game-over");
		setTimeout( function(){
			$("body").removeClass("game-over");
		} , 200);
		startOver();
	}
}

function nextSequence(){
	level++;
	$("#level-title").text("Level " + level);
	var randomNumber = Math.floor(Math.random() * 4);
	var randomChosenColour = buttonColours[randomNumber];
	gamePattern.push(randomChosenColour);
	console.log("gamePattern: " + gamePattern);
	makeSound(randomChosenColour);
	$("#" + randomChosenColour ).fadeOut(100).fadeIn(100);
	
}

function startOver(){
	level = 0;
	gamePattern = [];
	started = false;
	userClickedPattern = [];
}