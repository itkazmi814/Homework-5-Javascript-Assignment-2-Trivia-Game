$(document).ready(function() {

var game = { 

	numCorrect: 0,
	numIncorrect: 0,
	numUnanswered: 0,
	mainTimeID: null,
	sideTimeID: null,
	timerID: null,
	time: 30, 	
	i: -1,

	questionArray: [
		questionOne = {
			title: "Which Thomas Keller restaurant was rated best restaurant in the world in 2004?",
			choices: ["Noma","Osteria Francescana","The French Laundry","The Fat Duck"],
			answer: "The French Laundry",
		},

		questionTwo = {
			title: "Where is the best fish sandwich in Chicago?",
			choices: ["MicDuck's","Paron's","Big & Little's","Jim's Original"],
			answer: "Jim's Original",
		},

		questionThree = {
			title: "What American restaurant was rated #3 in the world in 2016 and #1 in 2017?",
			choices: ["Per Se","Eleven Madison Park","Alinea","Le Bernardin"],
			answer: "Eleven Madison Park",
		},

		questionFour = {
			title: "What is the most overrated restaurant in Chicago?",
			choices: ["Avec","High Five Ramen","Chicago Cut Steakhouse","Giordano's"],
			answer: "Avec",
		},

		questionFive = {
			title: "What Chef brought Mexican food to the forefront of contemporary fine dining when he opened Frontera Grill?",
			choices: ["Joel Robuchon","Rick Bayless","Daniel Humm","Rene Redzepi"],
			answer: "Rick Bayless"
		},

		questionSix = {
			title: "Which of the following do not belong to the same restaurant group under Chef Grant Achatz?",
			choices: ["Roister","Next","Alinea","Grace"],
			answer: "Grace"
		}

	],

	initializePage: function () {
		var newStartButton = $("<h2>");
		newStartButton.addClass("btn btn-secondary btn-lg btn-outline-secondary");
		newStartButton.attr("id","start-button");
		newStartButton.text("Start!");
		$("#title-container").append(newStartButton);
	},

	reset: function () {
		game.numCorrect = 0;
		game.numIncorrect = 0;
		game.numUnanswered = 0;
		game.timerIntervalID = null;
		game.mainTimeID = null;
		game.sideTimeID = null;

		$(".possible-answer").addClass("list-group-item-action")

		$("#title-container").empty();
		$("#title-container").attr("id","title-box");
		$("#title-container").addClass("inner-content no-border");

		game.i = 0;

		game.nextQuestion();
	},

	nextQuestion: function () {
		console.log("start new question")
		//display question details
		game.initializeNewQuestion();
		//start timer
		game.timerIntervalID = setInterval(game.countTime,1000)
		//run when you click on an answer
		$(".possible-answer").on("click", game.determineResult)
	},

	initializeNewQuestion: function () {
		this.time = 10
		$("#time-box").text(this.time + " seconds remaining");
		this.updateQuestionTitle();
		this.displayPossibleChoices();
	}, //end function initializeNewQuestion

	determineResult: function () {
		$(".possible-answer").removeClass("list-group-item-action")
		clearInterval(game.timerIntervalID);

		if(game.time === 0){
			$("#title-box").text("You ran out of time");
			game.numUnanswered++;
		}else if($(this).text() === game.questionArray[game.i].answer){
			$("#title-box").text("Correct");
			game.numCorrect++;
		}else{ 
			$("#title-box").text("Wrong answer");
			game.numIncorrect++;
		}

		$("#answer-box").empty();

		var answerDiv = $("<li>");
		answerDiv.addClass("list-group-item");
		answerDiv.text(game.questionArray[game.i].answer)
		$("#answer-box").append(answerDiv);

		var imageDiv = $("<li>");
		imageDiv.addClass("list-group-item");
		imageDiv.text("Insert image here");
		$("#answer-box").append(imageDiv);

		game.sideIntervalID = setTimeout(game.checkForNextQuestion,3000);

	}, //end function clickedAnswer

	checkForNextQuestion: function () {
		game.i++;
		console.log(game.i)
		if(game.i < game.questionArray.length){
			game.nextQuestion();
		}else{
			game.displayEndScreen();
		}
	},

	countTime: function () {
		game.time--;
		$("#time-box").text(game.time + " seconds remaining");
		
		if(game.time === 0){
			game.determineResult();
		}
	}, //end function countTime
	
	updateQuestionTitle: function () {
		$("#title-box").text(this.questionArray[this.i].title);
	}, //end function updateQuestionTitle

	displayPossibleChoices: function () {
		$("#answer-box").empty();

		for(var j = 0; j < this.questionArray[this.i].choices.length; j++){
			var newChoice = $("<li>");
			newChoice.attr("id","choice"+(j+1));
			newChoice.addClass("possible-answer list-group-item list-group-item-action");
			newChoice.text(this.questionArray[this.i].choices[j])
			$("#answer-box").append(newChoice);
		} //end for loop
	}, //end function displayPossibleChoices

	displayEndScreen: function () {
		$("#answer-box").empty();
		$("#time-box").empty();
		
		$("#title-box").text("How did you do?")
		$("#time-box").append($("<h2>").attr("id","start-button").addClass("btn btn-secondary btn-lg btn-outline-secondary").text("Play again?"));
		$("#answer-box").append($("<li>").addClass("list-group-item").text("Correct: " + this.numCorrect))
		$("#answer-box").append($("<li>").addClass("list-group-item").text("Inorrect: " + this.numIncorrect))
		$("#answer-box").append($("<li>").addClass("list-group-item").text("Unanswered: " + this.numUnanswered))

		$("#start-button").on("click", game.reset);
	}

} // end object game

game.initializePage();
$("#start-button").on("click", game.reset);


}); // end document.ready