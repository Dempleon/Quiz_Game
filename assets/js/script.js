var questionTxt = document.querySelector('#question')
var answers = document.querySelectorAll('#answer');
var timer = document.querySelector('#timer');
var hiscore = document.querySelector('#highScores');
var scoreForm = document.querySelector('#scoreForm');
var formSubmit = document.querySelector('#submit');


// questions will be an array of question objects
var questions = [
    {
        question: 'Question 1: The answer to this question is answer 3',
        answers: ['answer 0', 'answer 1', 'answer 2', 'answer 3'],
        correctAnswer: 'answer 3'
    },
    {
        question: 'Question 2: The answer to this question is answer 2',
        answers: ['answer 0', 'answer 1', 'answer 2', 'answer 3'],
        correctAnswer: 'answer 2'
    },
    {
        question: 'Question 3 The answer to this question is answer 0',
        answers: ['answer 0', 'answer 1', 'answer 2', 'answer 3'],
        correctAnswer: 'answer 0'
    },
    {
        question: 'Question 4: The answer to this question is answer 1',
        answers: ['answer 0', 'answer 1', 'answer 2', 'answer 3'],
        correctAnswer: 'answer 1'
    },
    {
        question: 'Question 5: The answer to this question is answer 2',
        answers: ['answer 0', 'answer 1', 'answer 2', 'answer 3'],
        correctAnswer: 'answer 2'
    }
]

var timeLeft = 60;
var currentQuestion = 0;
var gameOver = false;
var quizTimer;
var resultTimeOut;

// player scores will be stored as [name, timeleft]
var playerScore = ['', 0]

// add event listeners to question answers
for (var i = 0; i < answers.length; i++) {
    answers[i].addEventListener('click', clickQuestion);
}
hiscore.addEventListener('click', showHighScores);
formSubmit.addEventListener('click', updateHighScores);



// event handler for when a question answer is clicked
function clickQuestion(event) {
    // When the last question is reached
    if (currentQuestion >= questions.length) {
        console.log('no more questions');
        return;
    }
    console.log(event.target.innerText);

    // Correct answer is chosen, move move to the next question
    if (event.target.innerText === questions[currentQuestion].correctAnswer) {
        toggleResult('Correct!');
        currentQuestion++;
        setQuestion();
    } else {
        // wrong answer is chosen, decrease timer by 10 seconds and update timer
        // move on to the next question
        toggleResult('Wrong!');
        currentQuestion++;
        timeLeft -= 10;
        timer.textContent = "Time: " + timeLeft;
        setQuestion();
    }
}

function setQuestion(question) {
    // check to see if there are more questions, else stop the time
    // timer.textContent = "Time: " + timeLeft;
    if (currentQuestion >= questions.length) {
        console.log('no more questions');
        clearInterval(quizTimer);
        toggleQuiz();
        return;
    }
    questionTxt.textContent = questions[currentQuestion]["question"];
    for (var i = 0; i < answers.length; i++) {
        answers[i].textContent = questions[currentQuestion]["answers"][i];
    }
}

function countDown() {
    timer.textContent = "Time: " + timeLeft;
    if (timeLeft > 0) {
        timeLeft--;
    } else {

    }
}

quizTimer = setInterval(countDown, 1000)
setQuestion();
console.log(timeLeft);

function showHighScores() {
    // alert('hiscores');
    toggleQuiz();
    enterScore();
}

// makes the quiz elements hidden when looking at the hiscores
// or when entering highscores initials
function toggleQuiz() {
    if (timer.style.display === 'block') {
        hiscore.textContent = 'Start Quiz'
        questionTxt.style.display = 'none';
        timer.style.display = 'none';
        for (var i = 0; i < answers.length; i++) {
            answers[i].style.display = 'none';
        }
        return;
    } else {
        timeLeft = 60;
        currentQuestion = 0;
        timer.textContent = "Time: " + timeLeft;
        hiscore.textContent = 'View Highscores'
        questionTxt.style.display = 'block';
        timer.style.display = 'block';
        for (var i = 0; i < answers.length; i++) {
            answers[i].style.display = 'block';
        }
        setQuestion();
    }
}

function toggleResult(str) {
    var result = document.querySelector('#result');
    result.textContent = str;
    result.style.display = 'block'
    setTimeout(function() {
        result.style.display = 'none';
    }, 1500)
}

function enterScore() {
    scoreForm.style.display = 'block';
}

function toggleForm() {
    if (scoreForm.style.display === 'block') {
        scoreForm.style.display = 'none';
    } else {
        scoreForm.style.display = 'block';
    }
}

function updateHighScores() {
    playerScore[0] = document.querySelector('#name').value;
    playerScore[1] = timeLeft;
    document.querySelector('#name').value = '';
    console.log('playerscore: ' + playerScore);
}
