var questionTxt = document.querySelector('#question')
var answers = document.querySelectorAll('#answer');
var timer = document.querySelector('#timer');
var hiscore = document.querySelector('#highScores');

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
// var gameScore;

// add event listeners to question answers
for (var i = 0; i < answers.length; i++) {
    answers[i].addEventListener('click', clickQuestion);
}
hiscore.addEventListener('click', showHighScores);


// event handler for when the question answer is clicked
function clickQuestion(event) {
    // When the last question is reached
    if (currentQuestion >= questions.length) {
        console.log('no more questions');
        return;
    }
    console.log(event.target.innerText);

    // Correct answer is chosen, move move to the next question
    if (event.target.innerText === questions[currentQuestion].correctAnswer) {
        console.log('correct');
        currentQuestion++;
        setQuestion();
    } else {
        // wrong answer is chosen, decrease timer by 10 seconds and update timer
        // move on to the next question
        console.log('wrong');
        currentQuestion++;
        timeLeft -= 10;
        timer.textContent = "Time: " + timeLeft;
        setQuestion();
    }
}

function setQuestion(question) {
    // check to see if there are more questions, else stop the time
    timer.textContent = "Time: " + timeLeft;
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
}

function toggleQuiz() {
    if (timer.style.display === 'block') {
        hiscore.textContent = 'Quiz'
        questionTxt.style.display = 'none';
        timer.style.display = 'none';
        for (var i = 0; i < answers.length; i++) {
            answers[i].style.display = 'none';
        }
        return;
    } else {
        hiscore.textContent = 'View Highscores'
        questionTxt.style.display = 'block';
        timer.style.display = 'block';
        for (var i = 0; i < answers.length; i++) {
            answers[i].style.display = 'block';
        }
    }
}