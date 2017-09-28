$(document).ready(function() {

var game = { 

	numCorrect: 0,
	numIncorrect: 0,
	numUnanswered: 0,
	questionArray: [],
	mainIntervalID: null,
	sideInternvalID: null,
	time: 30,
	clockRunning: false,
	i: 1,

	pageInitialization: function () {
		this.createQuestions();
	},

	questionGenerator: function (titleInput, choicesInput, answerInput) {
		//creates a question object
		this.title = titleInput;
		this.choices = choicesInput;
		this.answer = answerInput;
	}, // end function questionGenerator

	createQuestions: function () {
		var questionOne = new this.questionGenerator("This is question one?",["Answer 1 Q1","Answer 2 Q1","Answer 3 Q1","Answer 4 Q1"],"Answer 3 Q1");
		var questionTwo = new this.questionGenerator("This is question two?",["Answer 1 Q2","Answer 2 Q2","Answer 3 Q2","Answer 4 Q2"],"Answer 3 Q2");
		var questionThree = new this.questionGenerator("This is question three?",["Answer 1 Q3","Answer 2 Q3","Answer 3 Q3","Answer 4 Q3"],"Answer 3 Q3");
		
		this.questionArray.push(questionOne);
		this.questionArray.push(questionTwo);
		this.questionArray.push(questionThree);
	}, //end function createCharacters

	startButtonPressed: function () {
		console.log("start button pressed")
		numCorrect = 0;
		numIncorrect = 0;
		numUnanswered = 0;
		mainIntervalID = null;
		sideInternvalID = null;
		$("#title-container").html('<h2 id="title-box"></h2>')
		$(".possible-answer").addClass("list-group-item-action")
		game.startGame();
	},

	startGame: function () {
			//display question details
			this.initializeNewQuestion();
			//run when you click on an answer
			$(".possible-answer").on("click", this.determineResult)
			//runs when time runs outs
			if(this.time === 0){
				this.determineResult();
			}

	}, //end function startGame

	determineResult: function () {
		console.log("entering determine result")

		$(".possible-answer").removeClass("list-group-item-action")

		game.time = 3;
		if(game.time === 0){
			$("#title-box").text("You ran out of time");
			game.numUnanswered++;
			game.displayResults();
		}else if($(this).text() === game.questionArray[game.i].answer){
			$("#title-box").text("You are correct");
			game.numCorrect++;
			game.displayResults();
		}else{ 
			$("#title-box").text("Wrong answer");
			game.numIncorrect++;
			game.displayResults();
		}
	}, //end function clickedAnswer

	countTime: function () {
		game.time--;
		$("#time-box").text(game.time + " seconds remaining");
		
		if(game.time === 0){
			game.displayResults();
		}
	}, //end function countTime
	
	updateQuestionTitle: function () {
		$("#title-box").text(this.questionArray[this.i].title);
	}, //end function updateQuestionTitle

	displayPossibleChoices: function () {
		for(var j = 0; j < this.questionArray[this.i].choices.length; j++){
			$("#answer-box").append('<li id="choice'+(j+1)+'" class="possible-answer list-group-item list-group-item-action">'+this.questionArray[this.i].choices[j]+'</li>');
		} //end for loop
	}, //end function displayPossibleChoices

	displayResults: function () {
		console.log("entering results");
		this.time = 3;
		$("#answer-box").empty();
		
		$("#answer-box").append('<li class="list-group-item">' + this.questionArray[this.i].answer + '</li>')
		$("#answer-box").append('<li class="list-group-item">' + 'Insert image here' + '</li>')

		console.log("correct: " + this.numCorrect + " incorrect: " + this.numIncorrect +  " Unanswered: " + this.numUnanswered)

	}, //end function displayCorrectAnswer

	initializeNewQuestion: function () {
		this.time = 5
		$("#time-box").text(this.time + " seconds remaining");
	
		this.updateQuestionTitle();
		this.displayPossibleChoices();

	
	} //end function initializeNewQuestion

} // end object game


game.pageInitialization();
$("#start-button").on("click", game.startButtonPressed);

// game.initializeNewQuestion();





}); // end document.ready