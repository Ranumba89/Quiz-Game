
var startPg = document.querySelector(".start-page");
var mainPg = document.querySelector(".main-page");
var lastPg = document.querySelector(".last-page");
var scoreEl = document.querySelector(".quiz-score");
var questionCol = document.querySelector(".question-column");
var answersCol = document.querySelector(".answers-column");
var alertCol = document.querySelector(".alert-column");
var initialsPg = document.querySelector(".initial-page")
var firstNameInput=document.querySelector("#first-name")
var signUpButton = document.querySelector("#sign-up");
var msgDiv = document.querySelector("#msg");
var userFirstNameSpan = document.querySelector("#user-first-name");
var gameClock = document.querySelector(".clock");
var scoreDisplay = document.querySelector("#user-Score")

var milliSec = 1000;
var timePerQest = 3;
var quizFailTime = milliSec * 30;
var n = quizes.length;
var gameTime = milliSec * n * (timePerQest + 13)

var quizNo;
var scores=0;
var currentQuiz;
var intervalHandle;


// Start funtion to go into the quiz. So the main page is displayed and the Start and last page are not 

function start() {


    startPg.setAttribute('style', 'display: none;');
    mainPg.setAttribute('style', 'display: inherit;');                        
    lastPg.setAttribute('style', 'display: none;');
    initialsPg.setAttribute('style', 'display: none;');

   

    quizNo = -1;
    scores=0;

    intervalHandle = setInterval(function(){
        gameTime = gameTime - milliSec;
        if (gameTime < 0){
            last()
            return
        }
        gameClock.textContent = (gameTime/milliSec)
    }, milliSec)
   

    nextQuiz()
    
}

// Back function shows the start page. Main and last page are not displayed but the start is 
function back() {
    startPg.setAttribute('style', 'display: inherit;');
    mainPg.setAttribute('style', 'display: none;');
    lastPg.setAttribute('style', 'display: none;');
    initialsPg.setAttribute('style', 'display: none;');
    


}


// Last page function to go to the last page. Main and start page are not displayed 
function last() {
    clearInterval(intervalHandle);
    mainPg.setAttribute('style', 'display: none;');
    startPg.setAttribute('style', 'display: none;');
    lastPg.setAttribute('style', 'display: inherit;');
    initialsPg.setAttribute('style', 'display: none;');

    scoreEl.textContent=scores;
}
function initials() {
    mainPg.setAttribute('style', 'display: none;');
    startPg.setAttribute('style', 'display: none;');
    lastPg.setAttribute('style', 'display: none;');
    initialsPg.setAttribute('style', 'display: inherit;');
    // scoreEl.textContent=scores;
}

// Remove texts(elements) so that you can append new questions and answers (defined)
function removeChildern(el) {
    var size = el.childElementCount;
    for (var index = 0; index < size; index++) {
        el.removeChild(el.firstElementChild)
    }
}
// Event listening for the right and wrong answers, while giving a second before going to the next page 
function clickAction(e) {
       
    var userAns = e.target.value;
    var actualAns = currentQuiz.correctAnswer;
    if (userAns === actualAns) {
        alertCol.textContent = "correct";
        scores=scores+1;
    }
    else {

        alertCol.textContent = "wrong";
        gameTime = gameTime - quizFailTime

    }
    setTimeout(function(){
        nextQuiz();
    },milliSec)

}
// Next question function. If the quiz number is greater than the length of the quiz then go to the last page (end of the quiz). If quiz number is less than the length of the quizes then go to the current question. 
// basically checking if this is the last question 
// Still removing the questions and the answers for the next set of questions and answers 
function nextQuiz() {
    quizNo = quizNo + 1;
    if (quizNo >= quizes.length) {
        last();
        return
    }
    currentQuiz = quizes[quizNo];

    alertCol.textContent = "";

    removeChildern(questionCol);
    questionCol.textContent = currentQuiz.question;


    var pAnswers = currentQuiz.possibleAnswers;
    removeChildern(answersCol);
// The event listeners for the set attributes and the click listeners
    for (var index = 0; index < pAnswers.length; index++) {
        var ans = pAnswers[index];

        var buttonEl = document.createElement("button");
        buttonEl.setAttribute('type', 'button');
        buttonEl.setAttribute('class', 'btn btn-outline-secondary btn-sm btn-block');
        buttonEl.setAttribute('value', index);
        buttonEl.addEventListener('click', clickAction)

        buttonEl.textContent = ans

        answersCol.appendChild(buttonEl);
    }
    

}
// Initials inputs 
function displayMessage(type, message) {
    msgDiv.textContent = message;
    msgDiv.setAttribute("class", type);
  }
signUpButton.addEventListener("click", function(event) {
    event.preventDefault();
  
    
    
    var firstName= firstNameInput.value.trim();
   
  if (firstName === "") {
    displayMessage("error", "Initials cannot be blank");
  } else {
        displayMessage("success", "Registered successfully");

        localStorage.setItem(firstName, scores);

        userFirstNameSpan.textContent = firstName 
        scoreDisplay.textContent = "score =" + scores
  }
})
