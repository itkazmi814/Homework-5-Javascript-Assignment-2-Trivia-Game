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
			title: "This is question one?",
			choices: ["Answer 1 Q1","Answer 2 Q1","Answer 3 Q1"],
			answer: "Answer 3 Q1",
		},

		questionTwo = {
			title: "This is question two?",
			choices: ["Answer 1 Q2","Answer 2 Q2","Answer 3 Q2"],
			answer: "Answer 3 Q2",
		},

		questionThree = {
			title: "This is question three?",
			choices: ["Answer 1 Q3","Answer 2 Q3","Answer 3 Q3"],
			answer: "Answer 3 Q3",
		},

		questionFour = {
			title: "This is question four?",
			choices: ["Answer 1 Q4","Answer 2 Q4","Answer 3 Q4"],
			answer: "Answer 3 Q4",
		},
],







	// createQuestions: function () {
	// 	var questionOne = new this.questionGenerator("This is question one?",["Answer 1 Q1","Answer 2 Q1","Answer 3 Q1"],"Answer 3 Q1");
	// 	var questionTwo = new this.questionGenerator("This is question two?",["Answer 1 Q2","Answer 2 Q2","Answer 3 Q2","Answer 4 Q2","Answer 5 Q2","Answer 6 Q2"],"Answer 3 Q2");
	// 	var questionThree = new this.questionGenerator("This is question three?",["Answer 1 Q3","Answer 2 Q3","Answer 3 Q3","Answer 4 Q3"],"Answer 3 Q3");
		
	// 	this.questionArray.push(questionOne);
	// 	this.questionArray.push(questionTwo);
	// 	this.questionArray.push(questionThree);
	// }, //end function createCharacters



	// questionGenerator: function (titleInput, choicesInput, answerInput) {
	// 	//creates a question object
	// 	this.title = titleInput;
	// 	this.choices = choicesInput;
	// 	this.answer = answerInput;
	// }, // end function questionGenerator

	initializePage: function () {
		// $("#title-container").html('<h2 id="start-button" class="btn btn-secondary btn-lg btn-outline-secondary">Start!</h2>');

		// $("title-container").empty();
		var newStartButton = $("<h2>");
		newStartButton.addClass("btn btn-secondary btn-lg btn-outline-secondary");
		newStartButton.attr("id","start-button");
		newStartButton.text("Start!");
		$("#title-container").append(newStartButton);

		// game.createQuestions();
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
		answerDiv.text("The answer is: " + game.questionArray[game.i].answer)
		$("#answer-box").append(answerDiv);

		var imageDiv = $("<li>");
		imageDiv.addClass("list-group-item");
		imageDiv.text("Insert image here");

		game.sideIntervalID = setTimeout(game.checkForNextQuestion,3000);

	}, //end function clickedAnswer

	checkForNextQuestion: function () {
		console.log("testlog")
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
		console.log("Display end screen")
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