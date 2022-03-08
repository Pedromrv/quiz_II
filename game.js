const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName('choice-text'));

const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');

const progressBarFull = document.getElementById('progressBarFull');

let questions = [
    {
        question: 'Inside which HTML element do we put the JavaScript??',
        choice1: '<script>',
        choice2: '<javascript>',
        choice3: '<js>',
        choice4: '<scripting>',
        answer: 1,
    },
    {
        question:"What is the correct syntax for referring to an external script called 'xxx.js'?",
        choice1: "<script href='xxx.js'>",
        choice2: "<script name='xxx.js'>",
        choice3: "<script src='xxx.js'>",
        choice4: "<script file='xxx.js'>",
        answer: 3,
    },
    {
        question: "How do you write 'Hello World' in an alert box?",
        choice1: "msgBox('Hello World');",
        choice2: "alertBox('Hello World');",
        choice3: "msg('Hello World');",
        choice4: "alert('Hello World');",
        answer: 4,
    },
    {
        question: "¿Cuántas zonas horarias hay en Rusia?",
        choice1: "1000",
        choice2: "13",
        choice3: "12",
        choice4: "11",
        answer: 3,
    },
    {
        question: "¿Qué país tiene más islas en el mundo?",
        choice1: "Suecia",
        choice2: "Nueva Zelanda",
        choice3: "Melilla",
        choice4: "Francia",
        answer: 1,
    },
    {
        question: "¿Cuál es el nombre en argot de la ciudad de Nueva York, utilizado por los locales?",
        choice1: "Gotham",
        choice2: "Big Apple",
        choice3: "Algorta",
        choice4: "The City",
        answer: 1,
    },
    {
        question: "¿Cuándo se inauguró el metro de Londres?",
        choice1: "1992",
        choice2: "1863",
        choice3: "1856",
        choice4: "1962",
        answer: 2,
    },
    {
        question: "¿Cuándo se fundó Netflix?",
        choice1: "2001",
        choice2: "2009",
        choice3: "1997",
        choice4: "2015",
        answer: 3,
    },
    {
        question: "¿Cuál de los siguientes imperios no tenía lengua escrita?",
        choice1: "Inca",
        choice2: "Azteca",
        choice3: "Egipcio",
        choice4: "Romano",
        answer: 1,
    }
    
];

// fetch API to load questions
fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple")
    .then(res => {
        return res.json();
    })
    .then(loadedQuestions => {
        console.log(loadedQuestions.results);
        questions = loadedQuestions.results.map(loadedQuestion => {
            const formattedQuestion = {
                question: loadedQuestion.question
            };
            const answerChoices = [...loadedQuestion.incorrect_answers];
            formattedQuestion.answer = Math.floor(Math.random()*3) + 1;
            answerChoices.splice(formattedQuestion.answer -1, 0, loadedQuestion.correct_answer);
            // we iterate through the answer choices, 
            answerChoices.forEach((choice, index) => {
                formattedQuestion["choice" + (index+1)] = choice;
            })
            return formattedQuestion;
        });
        startGame();
    })
    .catch(err => {
        console.log(err);
    });


let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];




//Constants

const CORRECT_BONUS = 5;
const MAX_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]; //spread operator: take this array, spread each of it's items and put them into a new array
    // console.log(availableQuestions);
    getNewQuestion();
};
getNewQuestion = () => {
    if (availableQuestions.length == 0 || questionCounter >= MAX_QUESTIONS){
        // save off the player score with localStorage saving score into mostRecentScore
        localStorage.setItem('mostRecentScore', score);
        //go to the final page if there are no more questions
        return window.location.assign("/end.html");
    }
    questionCounter++;
    // Update the question counter live
    // questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS; //another way to write it
    progressText.innerText = `Pregunta ${questionCounter}/${MAX_QUESTIONS}`;

    //update the progress bar (it has to be a value in percentage)
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`; // divide by the maximum number of questions and multiply by one hundred, to obtain the percentage.

    const questionIndex =  Math.floor(Math.random() * availableQuestions.length) // all related to the length of the array
    currentQuestion = availableQuestions[questionIndex];
    question.innerText =currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
        // console.log(choice.dataset["number"]);
    });// grab the choice property, get de data attribute number associate with it and use it to get the actual choice out of the current question
    
    availableQuestions.splice(questionIndex, 1); // get rid of the question we've just used
    
    acceptingAnswers = true; 
};
choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        console.log(selectedAnswer);

        // Traditional syntax

        // const classToAply = 'incorrect';
        // if (selectedAnswer == currentQuestion.answer) {
        //     classToAply = 'correct';
        // }

        // ternary syntax
        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
        // console.log(classToApply);

        if (classToApply == 'correct') {
            incrementScore(CORRECT_BONUS); // here we increment the score by the correct bonus, in this case value of 5.
        }

        selectedChoice.parentElement.classList.add(classToApply); // we take the container with parentElement
        setTimeout( ()=> {
            selectedChoice.parentElement.classList.remove(classToApply);  // timeout to delay the removing action so it can be visible
            getNewQuestion();
        }, 1000);

        // console.log(selectedAnswer == currentQuestion.answer); //visualize true or false by clicking the answers
        // console.log(selectedAnswer, currentQuestion.answer); //visualize true or false by clicking the answers
        
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score; // increment of the score
};

