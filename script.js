const quizData = [
    {
        question: "What is the capital of Uttar Pradesh?",
        answers: ["Lucknow", "Gorakhpur", "Varanasi", "Kanpur"],
        correct: 0 
    },
    {
        question: "Red Planet:",
        answers: ["Earth", "Mars", "Jupiter", "Saturn"],
        correct: 0 
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: ["Atlantic", "Indian", "Arctic", "Pacific"],
        correct: 3 
    }
];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
    const questionEl = document.querySelector('.question');
    const answersEl = document.querySelectorAll('.answers label');
    
    questionEl.innerText = quizData[currentQuestion].question;
    answersEl.forEach((label, index) => {
        const input = label.querySelector('input');
        input.checked = false;
        input.value = index; 
        label.querySelector('span').innerText = quizData[currentQuestion].answers[index];
    });

    document.getElementById('prev-btn').style.display = currentQuestion === 0 ? 'none' : 'inline-block';
    if (currentQuestion === quizData.length - 1) {
        document.getElementById('next-btn').style.display = 'none';
        document.getElementById('submit-btn').style.display = 'inline-block';
    } else {
        document.getElementById('next-btn').style.display = 'inline-block';
        document.getElementById('submit-btn').style.display = 'none';
    }
}

function nextQuestion() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (!selectedOption) {
        alert("Please select an answer!");
        return;
    }

    if (parseInt(selectedOption.value) === quizData[currentQuestion].correct) {
        score++;
    }

    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    }
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
}

function showResult() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption && parseInt(selectedOption.value) === quizData[currentQuestion].correct) {
        score++;
    }

    document.getElementById('quiz').style.display = 'none';
    document.querySelector('.buttons').style.display = 'none';
    document.getElementById('result').innerText = `Your score: ${(score / quizData.length * 100).toFixed(1)}%`; // Fixed template literal
}

document.getElementById('next-btn').addEventListener('click', nextQuestion);
document.getElementById('prev-btn').addEventListener('click', prevQuestion);
document.getElementById('submit-btn').addEventListener('click', showResult);

loadQuestion();
