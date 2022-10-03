var questionTxt = document.querySelector('#question')
var answers = document.querySelectorAll('li');

var questions = [
    {
        question: 'This question 1 is just filler text for test',
        answers: ['something', 'answer 1', 'answer 2', 'answer 3'],
        correctAnswer: 'answer 1'
    },
    {
        question: 'This question 2 is just filler text for test',
        answers: ['answer 0', 'answer 1', 'answer 2', 'answer 3'],
        correctAnswer: 1
    },
    {
        question: 'This question 3 is just filler text for test',
        answers: ['answer 0', 'answer 1', 'answer 2', 'answer 3'],
        correctAnswer: 1
    },
    {
        question: 'This question 4 is just filler text for test',
        answers: ['answer 0', 'answer 1', 'answer 2', 'answer 3'],
        correctAnswer: 1
    },
    {
        question: 'This question 5 is just filler text for test',
        answers: ['answer 0', 'answer 1', 'answer 2', 'answer 3'],
        correctAnswer: 1
    }
]

for (var i = 0; i < answers.length; i++) {
    answers[i].addEventListener('click', clickQuestion);
}

function clickQuestion(event) {
    console.log(event);
    console.log(event.path[0]);
    console.log(event.target.innerText);
    if(event.target.innerText === questions[0].correctAnswer) {
        console.log('correct');
    }
}

function setQuestion(question) {
    questionTxt.textContent = question["question"];
    for (var i = 0; i < answers.length; i++) {
        answers[i].textContent = question["answers"][i];
    }
}

setQuestion(questions[0]);