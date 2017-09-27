$(document).ready(function() {

var game = { 

	numCorrect: 0,
	numIncorrect: 0,
	numUnanswered: 0,
	questionArray: [],
	intervalID: null,
	time: 30,
	clockRunning: false,

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
		intervalID = null;
		
		game.startGame();
	},

	startGame: function () {
		//display question details
		this.initializeNewQuestion();
		//run when you click on an answer
		$(".possible-answer").on("click",this.clickedAnswer)


	}, //end function startGame

	clickedAnswer: function () {
		//stops the timer
		clearInterval(game.intervalID)
		console.log(this)

		if(this.id === 0){

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
		// clearInterval(callQ);
		console.log(this)
		$("#title-box").text(this.questionArray[1].title);
	}, //end function updateQuestionTitle

	displayPossibleChoices: function () {
		for(var i = 0; i < this.questionArray[1].choices.length; i++){
			$("#choice"+(i+1)).text(this.questionArray[1].choices[i]);
		} //end for loop
	}, //end function displayPossibleChoices

	displayResults: function () {
		console.log("entering results")
		$("#choice1").text(this.questionArray[1].answer);
	}, //end function displayCorrectAnswer

	initializeNewQuestion: function () {
		this.time = 30
		$("#time-box").text("30 seconds remaining");
		this.updateQuestionTitle();
		this.displayPossibleChoices();
		this.intervalID = setInterval(this.countTime,1000)
	} //end function initializeNewQuestion

} // end object game


game.pageInitialization();
$("#title-box").on("click", game.startButtonPressed);


// game.initializeNewQuestion();





}); // end document.ready