var questionTxt = document.querySelector('#question')
var answers = document.querySelectorAll('li');
var timer = document.querySelector('#timer');

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

// add event listeners to question answers
for (var i = 0; i < answers.length; i++) {
    answers[i].addEventListener('click', clickQuestion);
}

// event handler for when the question answer is clicked
function clickQuestion(event) {
    if(currentQuestion >= questions.length){
        console.log('no more questions');
        return;
    }
    console.log(event.target.innerText);
    if(event.target.innerText === questions[currentQuestion].correctAnswer) {
        console.log('correct');
        currentQuestion++;
        setQuestion();
    } else {
        console.log('wrong');
        currentQuestion++;
        timeLeft -= 10;
        setQuestion();
    }
}

function setQuestion(question) {

    if(currentQuestion >= questions.length){
        console.log('no more questions');
        clearInterval(quizTimer);
        return;
    }
    questionTxt.textContent = questions[currentQuestion]["question"];
    for (var i = 0; i < answers.length; i++) {
        answers[i].textContent = questions[currentQuestion]["answers"][i];
    }
}

function countDown() {
    timer.textContent = "Timer: " + timeLeft;
    if(timeLeft > 0) {
        timeLeft--;
    } else {

    }
}

quizTimer = setInterval(countDown, 1000)
setQuestion();