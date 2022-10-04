var questionTxt = document.querySelector('#question')
var answers = document.querySelectorAll('#answer');
var timer = document.querySelector('#timer');
var hiscore = document.querySelector('#highScores');
var scoreForm = document.querySelector('#scoreForm');
var formSubmit = document.querySelector('#submit');
var scoresTable = document.querySelector('#scoresTable');


// questions will be an array of question objects
var questions = [
    {
        question: 'Question 1: Which method is used to add a new element to the end of an array?',
        answers: ['add()', 'pop()', 'splice()', 'push()'],
        correctAnswer: 'push()'
    },
    {
        question: 'Question 2: Which HTML tag is used to define an image into the webpage',
        answers: ['<image>', '<table>', '<img>', '<link>'],
        correctAnswer: '<img>'
    },
    {
        question: 'Question 3 Which is these html tags are not semantic?',
        answers: ['<div>', '<header>', '<footer>', '<article>'],
        correctAnswer: '<div>'
    },
    {
        question: 'Question 4: Which method is used to generate a random number?',
        answers: ['Math.rand()', 'random()', 'Math.randomNumber()', 'Math.random()'],
        correctAnswer: 'Math.random()'
    },
    {
        question: 'Question 5: Which code correctly returns the type of an object?',
        answers: ['object.typeof', 'object.typeof()', 'typeof(object)', 'object.getTypeOf()'],
        correctAnswer: 'typeof(object)'
    },
    {
        question: 'Question 6: When choosing a color in css, which is the correct order for the color values?',
        answers: ['red green blue', 'blue red green', 'yellow blue red', 'green blue red'],
        correctAnswer: 'red green blue'
    },
    {
        question: 'Question 7: What is the standard character encoding to display letters in a webpage?',
        answers: ['UTF-32', 'ISO-8859-1', 'ASCII', 'UTF-8'],
        correctAnswer: 'UTF-8'
    }
]

var timeLeft = 60;
var currentQuestion = 0;
var gameOver = false;
var quizTimer;
var localScores = JSON.parse(localStorage.getItem('scores'));

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

// function to change the displayed question and answers
function setQuestion(question) {

    // check to see if there are more questions, else stop the time
    if (currentQuestion >= questions.length) {
        console.log('no more questions');
        clearInterval(quizTimer);
        showHighScores();
        return;
    }
    questionTxt.textContent = questions[currentQuestion]["question"];
    for (var i = 0; i < answers.length; i++) {
        answers[i].textContent = questions[currentQuestion]["answers"][i];
    }
}

// function to countdown the quiztimer;
function countDown() {
    timer.textContent = "Time: " + timeLeft;
    if (timeLeft > 0) {
        timeLeft--;
    }
}



// function to display the hiscores section and to hide questions, answers, timer
function showHighScores() {
    toggleQuiz();
    toggleForm();
    toggleScoresTable();
    showTable(localScores);
}

// makes the quiz elements hidden when looking at the hiscores
// or when entering highscores initials
// 
function toggleQuiz() {
    // hides timer, question, answers if they are currently visible
    if (timer.style.display === 'block') {
        hiscore.textContent = 'Start Quiz'
        questionTxt.style.display = 'none';
        timer.style.display = 'none';
        for (var i = 0; i < answers.length; i++) {
            answers[i].style.display = 'none';
        }
        clearInterval(quizTimer);
        return;
    } else {
        //when returning from hiscores, the time is reset, currentquestion is reset
        // quiztimer is restarted
        // questions, answers, timer are changed to display: Block
        timeLeft = 60;
        currentQuestion = 0;
        timer.textContent = "Time: " + timeLeft;
        hiscore.textContent = 'View Highscores'
        questionTxt.style.display = 'block';
        timer.style.display = 'block';
        for (var i = 0; i < answers.length; i++) {
            answers[i].style.display = 'block';
        }
        
        quizTimer = setInterval(countDown, 1000);
        setQuestion();
    }
}

// temporarily displays the result of answering a question correctly or wrong
function toggleResult(str) {
    var result = document.querySelector('#result');
    result.textContent = str;
    result.style.display = 'block'
    setTimeout(function() {
        result.style.display = 'none';
    }, 1500)

}


// function is toggle the display for entering name and score into hiscores
function toggleForm() {
    if (scoreForm.style.display === 'block') {
        scoreForm.style.display = 'none';
    } else {
        scoreForm.style.display = 'block';
    }
}

// function to toggle display of scoresTable
function toggleScoresTable() {
    if (scoresTable.style.display === 'block') {
        scoresTable.style.display = 'none';
    } else {
        scoresTable.style.display = 'block';
    }
}

// function to update the hiscores table and the localstorage scores
function updateHighScores() {
    playerScore[0] = document.querySelector('#name').value;
    if(!playerScore[0]) {
        return;
    }
    document.querySelector('#name').value = '';
    if (localScores === null) {
        localScores = [];
    }
    localScores.push([playerScore[0], timeLeft]);
    localStorage.setItem('scores', JSON.stringify(localScores));

    showTable(localScores);
}

// function to dynamically create a highscosres table from the scores
// stored in local storage
function showTable(array) {
    // select the  table
    let tbl = document.querySelector('#scoresTable');
    //clear the inner html to avoid duplicates
    tbl.innerHTML = '';
    // create the first row headers
    let firstrow = document.createElement('tr');
    firstrow.innerHTML = '<tr><th>Name</th><th>Score</th></tr>';
    tbl.appendChild(firstrow);
    //dynamically populate the hiscores table from local storage
    for(var i = 0; i < array.length; i++) {
        var tableString = '<tr><td>' + array[i][0] + '</td><td>' + array[i][1] + '</td></tr>';
        let row = document.createElement('tr');
        row.innerHTML = tableString;
        tbl.appendChild(row);
    }
}

quizTimer = setInterval(countDown, 1000)
setQuestion();