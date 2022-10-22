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
    ["by the use of a pseudo-class", "by the use of a form", "by the use of a div", "by the use of the var keyword"]
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

// where the quiz results will be displayed
var endForm = document.createElement("form");
var msgEndQuiz = document.createElement("h2");
var finalQuizScore = document.createElement("p");

// input and the button to save the initials and score
var labelInputBox = document.createElement("label");
var initialsInputBox = document.createElement("input");
var scoreSubmitBtn = document.createElement("button");

// for the calculation of the total score
var incorrectResponses;
var correctResponses;
var totalScore;

// array for the initials and scores
var initialsScore = [];
var initialsScoreSorted;

// where the high scores will be displayed
var highScoreForm = document.createElement("form");
var highScoresHeading = document.createElement("h2");
var highScoresList = document.createElement("ul");

// the 'go back' and clear buttons for the high scores summary
var buttonContainer = document.createElement("div");
var goBackBtn = document.createElement("button");
var clearHighScores = document.createElement("button");

// stored initials/scores
var storedScore;

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
    visibleHighScores = true;
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
            visibleHighScores = false;
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

    if (!visibleHighScores) {
        return;
    }

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

    if ((keepTrackResponses.length == correctAnswer.length)) {
        visibleHighScores = false;
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

// to display the results of the quiz
// button to save initials and score
function endQuiz() {
    addQuestionsForm.remove();

    mainPage.appendChild(endForm);
    endForm.appendChild(msgEndQuiz);
    endForm.appendChild(finalQuizScore);

    endForm.setAttribute("id", "end-quiz-form");
    msgEndQuiz.setAttribute("id", "msg-done");
    finalQuizScore.setAttribute("id", "final-quiz-score");

    msgEndQuiz.textContent = "The Quiz Session has ended!";

    // calculation of the total score
    correctResponses = Array.from(keepTrackResponses).filter(element => element == "Correct");
    totalScore = Math.round(Number(correctResponses.length / (questionsQuiz.length)) * 100);

    // where the score is displayed
    finalQuizScore.textContent = ("Your total score on this quiz: " + totalScore + "%");

    endForm.appendChild(labelInputBox);
    labelInputBox.setAttribute("id", "initials-label");
    labelInputBox.setAttribute("for", "initials");
    labelInputBox.textContent = "Enter your initials";
    
    // where to input initials
    endForm.appendChild(initialsInputBox);
    initialsInputBox.setAttribute("id", "initials");
    initialsInputBox.setAttribute("type", "text");
    initialsInputBox.setAttribute("placeholder", "type here");
    initialsInputBox.value = "";

    // button to save initials and score
    endForm.appendChild(scoreSubmitBtn);
    scoreSubmitBtn.setAttribute("id", "score-button");
    scoreSubmitBtn.setAttribute("type", "submit");
    scoreSubmitBtn.textContent = "Submit Score";

    for (i = 0; i < endForm.childElementCount; i++) {
        endForm.children[i].setAttribute("class", "final-score")
    }
    visibleHighScores = false;
}

// to save initials and scores
// local storage is used
scoreSubmitBtn.addEventListener("click", (event) => {
    event.preventDefault();

    // saved initials and score 
    var eachInitialsScore = {
        "initials": initialsInputBox.value,
        "score": totalScore
    };

    initialsScore.push(eachInitialsScore);
    // to sort highest to lowest
    initialsScoreSorted = initialsScore.sort(function (low, high) { return high.score - low.score });

    // local storage
    localStorage.setItem("initialsScore", JSON.stringify(initialsScoreSorted));

    endForm.remove();
    
    // to display the high scores summary
    highScoresSummary();
})

// to display the initials and scores from local storage
function highScoresSummary() {
    
    // a heading, a sorted list of scores, a 'Go Back' button, and a 'Clear High Scores' button 
    mainPage.appendChild(highScoreForm);
    highScoreForm.appendChild(highScoresHeading);
    highScoreForm.appendChild(highScoresList);
    highScoreForm.appendChild(buttonContainer);
    buttonContainer.appendChild(goBackBtn);
    buttonContainer.appendChild(clearHighScores);

    // id attributes
    highScoreForm.setAttribute("id", "high-score-form");
    highScoresHeading.setAttribute("id", "heading-high-score");
    highScoresList.setAttribute("id", "high-scores");
    buttonContainer.setAttribute("id", "button-container");
    goBackBtn.setAttribute("id", "go-back-button");
    clearHighScores.setAttribute("id", "clear-score");

    highScoresHeading.setAttribute("style", "background-color: var(--color-BL); color: var(--text-color-W)");

    // two buttons: go back and clear
    goBackBtn.setAttribute("type", "submit");
    goBackBtn.textContent = "Go Back";
    clearHighScores.setAttribute("type", "submit");
    clearHighScores.textContent = "Clear High Scores";
    
    // heading for the summary
    highScoresHeading.innerHTML = "High Scores";
    
    // get from local storage
    storedScore = JSON.parse(localStorage.getItem("initialsScore"));

    // to display initials/scores from local storage
    if (storedScore != null) {
        for (var i = 0; i < storedScore.length; i++) {
            var scoresListItem = document.createElement("li");
            scoresListItem.innerHTML = (storedScore[i].initials + " " + storedScore[i].score + "%");
            highScoresList.appendChild(scoresListItem);
            scoresListItem.setAttribute("style", "color: var(--color-BL); font-family: var(--fontfamily-C)");
        }
        initialsScore = storedScore;
    }
    return initialsScore;
}

// to go back to the intro
goBackBtn.addEventListener("click", (event) => {
    event.preventDefault();
    // clear and remove
    highScoresList.innerHTML = "";
    highScoreForm.remove();
    timerTracking.innerHTML = "";
    timeRemaining = 50;
    timerTracking.setAttribute("style", "background-color: var(--color-GY)"); 
    // call introPageShow
    introPageShow();
})

// to clear the high scores summary and local storage
clearHighScores.addEventListener("click", (event) => {
    event.preventDefault();
    highScoresList.innerHTML = "";
    initialsScore = [];
    localStorage.clear();
})


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
    if (!visibleHighScores) {
        return;
    }
    // to clear / remove
    clearInterval(timer);
    timerTracking.innerHTML = "";
    timerTracking.setAttribute("style", "background-color: var(--color-TGN)");
    sectionIntro.remove();
    addQuestionsForm.remove();
    possibleAnswersList.innerHTML = "";
    endForm.remove(); 

    // calls highScoresSummary
    highScoresSummary();
    visibleHighScores = false;
})