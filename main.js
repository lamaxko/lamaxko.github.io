// main.js

// Declare global variables
// Declare global variables
let counter = 0;
let totalQuestions = 0;
let correctAnswers = 0;
let currentAnswer = 0;

// Function to generate a new equation
function generateEquation() {
    const num1 = Math.floor(Math.random() * 50);
    const num2 = Math.floor(Math.random() * 50);
    const equationText = `${num1} + ${num2} = ?`;
    currentAnswer = num1 + num2;
    document.getElementById('equation').innerText = equationText;
}

// Start Page
if (document.getElementById('startForm')) {
    document.getElementById('startForm').addEventListener('submit', function(event) {
        event.preventDefault();
        totalQuestions = parseInt(document.getElementById('numQuestions').value);
        localStorage.setItem('totalQuestions', totalQuestions);  // Store in localStorage
        window.location.href = 'quiz.html';  // Full path in GitHub Pages
    });
}

// Quiz Page
if (document.getElementById('quizForm')) {
    window.addEventListener('load', function() {
        totalQuestions = localStorage.getItem('totalQuestions');  // Retrieve from localStorage
        generateEquation();
        document.getElementById('answer').focus();
    });

    document.getElementById('quizForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const userAnswer = parseFloat(document.getElementById('answer').value);
        
        if (userAnswer === currentAnswer) {
            correctAnswers++;
        }

        counter++;

        // Update progress
        document.getElementById('progress').innerText = `${counter}/${totalQuestions}`;


        if (counter < totalQuestions) {
            generateEquation();
            document.getElementById('answer').value = '';
            document.getElementById('answer').focus();
        } else {
            // Redirect to end page
            localStorage.setItem('correctAnswers', correctAnswers);
            localStorage.setItem('totalQuestions', totalQuestions);
            window.location.href = 'end.html';
        }
    });
}

// End Page
if (document.getElementById('correctAnswers')) {
    window.onload = function() {
        const correctAnswers = localStorage.getItem('correctAnswers');
        const totalQuestions = localStorage.getItem('totalQuestions');
        const percentage = ((correctAnswers / totalQuestions) * 100).toFixed(2);

        document.getElementById('correctAnswers').innerText = correctAnswers;
        document.getElementById('percentage').innerText = percentage;

        // Set up the Retry button
        document.getElementById('retryBtn').addEventListener('click', function() {
            // Redirect to the start page
            window.location.href = 'index.html';
        });
    };
}