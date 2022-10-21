var mainPage = document.getElementById("main-grid");

// for the intro and a button to start the quiz
var sectionIntro = document.createElement("section");
var headingIntro = document.createElement("h1");
var instructionsIntro = document.createElement("p");
var startBtn = document.createElement("button");

// timer in nav
var timerTracking = document.getElementById("timer");
var timeRemaining = 50;
var timer;

// arrays containing the questions, answer choices, and correct answers
var questionsQuiz = [
    "To execute a function in JavaScript, it must be:",
    "Which of the following is not a conditional statement in JavaScript?",
    "Which of the following can be used to store various, related items of data in JavaScript?",
    "Which of the following is not a loop statement in JavaScript?",
    "How can a variable be declared in JavaScript?"
];

var answerChoicesArray = [
    ["reordered", "called", "changed", "reduced"],
    ["if", "switch", "div", "else if"],
    ["a commit message", "a pseudo-class", "the <br> tag", "an array"],
    ["check read statement", "for statement", "for in statement", "do while statement"],
    ["by the use of a pseudo-class", "by the use of a form", "by the use of div", "by the use of the var keyword"]
];

var correctAnswer = [2, 3, 4, 1, 4];

// for the questions and answer choices
var addQuestionsForm = document.createElement("form");
var askQuizQuestion = document.createElement("h2");
var possibleAnswersList = document.createElement("ol");

// for the message about whether the answer chosen is correct or incorrect
var checkResponse = document.createElement("p");

// to keep track of the questions and correct / incorrect answers
var keepTrackQuestions = 0;
var keepTrackResponses = [];

var onlyOneAnswer = true;
var answerChosen;

// 'view high scores' button
var viewHighScoresBtn = document.getElementById("view-high-scores");
var visibleHighScores;

// to create the intro, which includes the heading, the instructions, and a 'Start Quiz' button, and display the time limit
function introPageShow() {

    mainPage.appendChild(sectionIntro);
    sectionIntro.appendChild(headingIntro);
    sectionIntro.appendChild(instructionsIntro);
    sectionIntro.appendChild(startBtn);

    // intro
    timerTracking.innerHTML = ("Timer: " + timeRemaining + " seconds");
    headingIntro.innerHTML = "Quiz - JavaScript";
    instructionsIntro.innerHTML = "Instructions: The following timed quiz about JavaScript consists of 5 questions. Choose the best answer. The timer is displayed on the top of the page. Please note the time limit for the quiz. For each incorrect answer, the remaining time will be further reduced."
    startBtn.textContent = "Start Quiz";

    // class and id attributes
    for (i = 0; i < sectionIntro.childElementCount; i++) {
        sectionIntro.children[i].setAttribute("class", "intro")
    }
    sectionIntro.setAttribute("id", "intro-sec");
    instructionsIntro.setAttribute("id", "instructions");
    startBtn.setAttribute("id", "start-button");

    clearInterval(timer);
}

// calls introPageShow
introPageShow()

// timer that counts down
// calls endQuiz
function timerCountDown() {
    timerTracking.innerHTML = "Time remaining: " + timeRemaining;

    timer = setInterval(function () {
        timeRemaining--;
        timerTracking.innerHTML = "Time remaining: " + timeRemaining;

        if ((timeRemaining <= 0)) {
            clearInterval(timer);
            timerTracking.innerHTML = "Quiz timer has run out";
            setTimeout(() => {
                timerTracking.innerHTML = "Timer";
                askQuizQuestion.innerHTML = "";
                possibleAnswersList.innerHTML = "";
                checkResponse.innerHTML = "";
                // calls endQuiz
                endQuiz();
            }, 1500)
        }
    }, 1000);
    return timeRemaining;
}

// to display the questions and answer choices
function addQuestions() {

    mainPage.appendChild(addQuestionsForm);
    addQuestionsForm.appendChild(askQuizQuestion);
    addQuestionsForm.appendChild(possibleAnswersList);
    addQuestionsForm.appendChild(checkResponse);

    // class and id attributes
    for (i = 0; i < addQuestionsForm.childElementCount; i++) {
        addQuestionsForm.children[i].setAttribute("class", "questions")
    }
    addQuestionsForm.setAttribute("id", "add-questions-form");
    askQuizQuestion.setAttribute("id", "ask-question");
    possibleAnswersList.setAttribute("id", "answer-choices");
    checkResponse.setAttribute("id", "check-answer");

    // to display the question along with the answer choices from the arrays
    askQuizQuestion.innerHTML = questionsQuiz[keepTrackQuestions];

    for (var j = 0; j < answerChoicesArray[keepTrackQuestions].length; j++) {
        var answerChoiceListItem = document.createElement("li");
        var showAnswerChoice = answerChoicesArray[keepTrackQuestions][j];
        answerChoiceListItem.textContent = showAnswerChoice;

        // data index used later to determine whether the answer chosen is correct
        answerChoiceListItem.setAttribute("data-index", j);
        answerChoiceListItem.setAttribute("class", "list-item");
        possibleAnswersList.appendChild(answerChoiceListItem);
    };

    keepTrackQuestions++;
    onlyOneAnswer = true;
}

// to click on an answer choice; to display a message about whether the answer chosen is correct or incorrect 
// to keep track of the correct / incorrect answers
possibleAnswersList.addEventListener("click", (event) => {
    event.preventDefault();

    if (onlyOneAnswer) {
        answerChosen = event.target;

        // data index used to determine whether the answer chosen is correct
        var indexDataset = answerChosen.getAttribute("data-index");

        // to show whether the answer is correct; if the answer is incorrect, the time remaining is further reduced (see below);
        switch (true) {
            case (Number(indexDataset) + 1) == correctAnswer[keepTrackQuestions - 1]:
                checkResponse.innerHTML = "Correct";
                checkResponse.setAttribute("style", "color: #006400");
                break;
            default: checkResponse.innerHTML = "Incorrect";
                checkResponse.setAttribute("style", "color: #8b0000");
                timeRemaining -= 9;
        }
        // to keep track of the answers
        keepTrackResponses.push(checkResponse.textContent);
        onlyOneAnswer = !onlyOneAnswer;
    } else {
        return;
    }

    setTimeout(() => {
        askQuizQuestion.innerHTML = "";
        possibleAnswersList.innerHTML = "";
        checkResponse.innerHTML = "";

        // to display the next question with the answer choices or end the quiz given the time remaining
        if ((keepTrackResponses.length != correctAnswer.length) && timeRemaining > 0) {
            addQuestions();
        } else {
            clearInterval(timer);
            timerTracking.innerHTML = "Timer";
            endQuiz();
        }
    }, 1250)
})

function endQuiz() {}

// to start the quiz; calls timerCountDown and addQuestions
startBtn.addEventListener("click", () => {
    // to remove the quiz intro
    sectionIntro.remove();

    // values and array
    keepTrackQuestions = 0;
    keepTrackResponses = [];
    timeRemaining = 50;

    // to start the timer and display the questions along with the answer choices
    timerCountDown();
    addQuestions();
})

// to display the high scores summary
viewHighScoresBtn.addEventListener("click", () => {
})