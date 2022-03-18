var startButton = document.getElementById("start-btn");
var nextButton = document.getElementById("next-btn");
var questionBoxElement = document.getElementById("question-container");
var questionElement = document.getElementById("question");
var answerBtnElement = document.getElementById("answer-btns");
var highscoreBtnElement = document.getElementById("highscore-btn");
var endBoxElement = document.getElementById("end-container");

var timerEl = document.getElementById('countdown');

var shuffledQuestions, currentQuestionIndex;

function countdown() {
    var timeLeft =60;              // timer start with 60 sec.

    var timeInterval = setInterval(function() {
        if(timeLeft > 0) {
            timerEl.textContent = timeLeft;
            timeLeft--;
        } else {
            timerEl.textContent = '';       // set to empty string to get rid of it
            clearInterval(timeInterval);    // tells timer to quit
            highscoreBtnElement.classList.remove('hide');  //highscore show up after the timer
            questionBoxElement.classList.add('hide');
        }
    document.getElementById("countdown").innerHTML = timeLeft + " seconds left";
    }, 1000);
}

function startQuiz() {
    startButton.classList.add('hide');      // hide the start button
    countdown();
    endBoxElement.classList.add('hide');  // hide the endBox
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionBoxElement.classList.remove('hide');    // shows the question box and choices
    nextQuestion();
}

function nextQuestion() {               // what happens when you click the 'next' btn 
    resetAnswer();                        //reset answers
    showQuestion(shuffledQuestions[currentQuestionIndex]);
    questionBoxElement.classList.remove('hide');   // shows the question box and choices
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {            // replacing button with the text answer choices
        var button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;        // storing answer in dataset
        }
        button.addEventListener('click', selectAnswer);
        answerBtnElement.appendChild(button);
    })
}



function resetAnswer() {
    nextButton.classList.add("hide");       //want to hide the 'next' btn when the next answer appears
    while (answerBtnElement.firstChild) {
        answerBtnElement.removeChild(answerBtnElement.firstChild);
    }
}

function selectAnswer(event) { 
    var selectedButton = event.target;
    var correct = selectedButton.dataset.correct;
    var answerScore = 0;
    questionBoxElement.classList.add('hide');       // hide the question box once the answer is selected so user 
    nextButton.classList.remove("hide");            // can only click on the 'next' button
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        questionElement.innerText = "End Quiz";     // Replaced 'question' text with 'End Quiz'
        answerBtnElement.classList.add('hide');     // hide answer btn choices
        nextButton.classList.add('hide');           // hide next btn
        highscoreBtnElement.classList.remove('hide');       // show 'high score' button
        endBoxElement.classList.remove('hide');     // show endBox
    }
}


startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', () => {    //currentQuestion function = ++ increment to next q
    currentQuestionIndex++;
    nextQuestion();
})


var questions = [
    {
        question: "Which of the following is not considered a JavaScript pop-up box?",
        answers: [
            {text: "Alert box", correct: false},
            {text: "Flex box", correct: true},
            {text: "Confirm box", correct: false},
            {text: "Prompt box", correct: false}
        ]
    },
    {
        question: "When using flexbox, which of the following will move the box vertically?",
        answers: [
            {text: "display: flex", correct: false},
            {text: "justify content", correct: false},
            {text: "align-items", correct: true},
            {text: "flex-direction", correct: false}
        ]
    },
    {
        question: "Which of the following is not a JavaScript Operator?",
        answers: [
            {text: "*", correct: false},
            {text: "%", correct: false},
            {text: "+", correct: false},
            {text: "!", correct: true}
        ]
    },
    {
        question: "Which of the following DOM is used to find and element by its ID?",
        answers: [
            {text: "getElementById()", correct: true},
            {text: "getElement()", correct: false},
            {text: "createElement()", correct: false},
            {text: "getId()", correct: false}
        ]
    },
    {
        question: "Which of the following is not a Javascript conditional statement?",
        answers: [
            {text: "if", correct: false},
            {text: "or", correct: true},
            {text: "else", correct: false},
            {text: "switch", correct: false}
        ]
    },
           
]



// TO-DO'S:  
// stop the timer when quiz is done
// tally up score
// localStorage to enter initial when game is completed
// https://stackoverflow.com/questions/61553701/how-can-i-stop-my-timer-function-if-the-quiz-ends-before-time-is-up-javascript