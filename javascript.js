$(document).ready(function() {

var game = { 

	numCorrect: 0,
	numIncorrect: 0,
	numUnanswered: 0,
	questionArray: [],
	mainTimeID: null,
	sideTimeID: null,
	timerID: null,
	time: 30,
	i: -1,

	questionGenerator: function (titleInput, choicesInput, answerInput) {
		//creates a question object
		this.title = titleInput;
		this.choices = choicesInput;
		this.answer = answerInput;
	}, // end function questionGenerator

	initializePage: function () {
		$("#title-container").html('<h2 id="start-button" class="btn btn-secondary btn-lg btn-outline-secondary">Start!</h2>');
		game.createQuestions();
	},

	createQuestions: function () {
		var questionOne = new this.questionGenerator("This is question one?",["Answer 1 Q1","Answer 2 Q1","Answer 3 Q1"],"Answer 3 Q1");
		var questionTwo = new this.questionGenerator("This is question two?",["Answer 1 Q2","Answer 2 Q2","Answer 3 Q2","Answer 4 Q2","Answer 5 Q2","Answer 6 Q2"],"Answer 3 Q2");
		var questionThree = new this.questionGenerator("This is question three?",["Answer 1 Q3","Answer 2 Q3","Answer 3 Q3","Answer 4 Q3"],"Answer 3 Q3");
		
		this.questionArray.push(questionOne);
		this.questionArray.push(questionTwo);
		this.questionArray.push(questionThree);
	}, //end function createCharacters

	reset: function () {
		game.numCorrect = 0;
		game.numIncorrect = 0;
		game.numUnanswered = 0;
		game.timerIntervalID = null;
		game.mainTimeID = null;
		game.sideTimeID = null;
		$("#title-container").html('<h2 id="title-box"></h2>')
		$(".possible-answer").addClass("list-group-item-action")
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
		$("#answer-box").append('<li class="list-group-item">' + ' The answer is: ' + game.questionArray[game.i].answer + '</li>')
		$("#answer-box").append('<li class="list-group-item">' + 'Insert image here' + '</li>')

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
			$("#answer-box").append('<li id="choice'+(j+1)+'" class="possible-answer list-group-item list-group-item-action">'+this.questionArray[this.i].choices[j]+'</li>');
		} //end for loop
	}, //end function displayPossibleChoices

	displayEndScreen: function () {
		console.log("Display end screen")
		$("#answer-box").empty();
		$("#time-box").html('<h2 id="start-button" class="btn btn-secondary btn-lg btn-outline-secondary">Play again?</h2>');
		$("#title-box").text("How did you do?")
		$("#answer-box").append('<li class="list-group-item">' + 'Correct: ' + this.numCorrect + '</li>');
		$("#answer-box").append('<li class="list-group-item">' + 'Incorrect: ' + this.numIncorrect + '</li>');
		$("#answer-box").append('<li class="list-group-item">' + 'Unanswered: ' + this.numUnanswered + '</li>');

		$("#start-button").on("click", game.reset);
	}

} // end object game

game.initializePage();
$("#start-button").on("click", game.reset);


}); // end document.ready