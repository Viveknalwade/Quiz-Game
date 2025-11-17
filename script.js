const questions = [
  {
    category: "Maths",
    question: "What is the value of cos 90?",
    choices: ["0", "1", "not defined"],
    answer: "0"
  },
  {
    category: "Astronomy",
    question: "What is the largest planet in our solar system?",
    choices: ["Earth", "Saturn", "Jupiter"],
    answer: "Jupiter"
  },
  {
    category: "Computer",
    question: "Full form of DS?",
    choices: ["Data Structure", "Data Science", "Data Scientist"],
    answer: "Data Structure"
  },
  {
    category: "Name",
    question: "What is your name?",
    choices: ["Vivek", "Viky", "Vivi"],
    answer: "Vivek"
  },
  {
    category: "Geography",
    question: "What is the capital of Japan?",
    choices: ["Osaka", "London", "Tokyo"],
    answer: "Tokyo"
  }
];

// Game state
let currentQuestionIndex = 0;
let score = 0;
let usedQuestions = [];
let currentQuestion = null;
let userAnswer = null;

// DOM elements
const categoryEl = document.getElementById('category');
const questionEl = document.getElementById('question');
const choicesEl = document.getElementById('choices');
const resultEl = document.getElementById('result');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const scoreEl = document.getElementById('score');
const questionCountEl = document.getElementById('question-count');
const quizContent = document.getElementById('quiz-content');
const finalScreen = document.getElementById('final-screen');
const finalScoreEl = document.getElementById('final-score');
const finalMessageEl = document.getElementById('final-message');
const playAgainBtn = document.getElementById('play-again-btn');

// Utility functions
function getRandomQuestion(questions) {
  const availableQuestions = questions.filter((_, index) => !usedQuestions.includes(index));
  
  if (availableQuestions.length === 0) {
    return null;
  }
  
  const randomIndex = Math.floor(Math.random() * availableQuestions.length);
  const selectedQuestion = availableQuestions[randomIndex];
  const originalIndex = questions.indexOf(selectedQuestion);
  usedQuestions.push(originalIndex);
  
  return selectedQuestion;
}

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Display question
function displayQuestion() {
  currentQuestion = getRandomQuestion(questions);
  
  if (!currentQuestion) {
    showFinalScreen();
    return;
  }

  currentQuestionIndex++;
  userAnswer = null;
  
  // Update UI
  categoryEl.textContent = currentQuestion.category;
  questionEl.textContent = currentQuestion.question;
  questionCountEl.textContent = `${currentQuestionIndex}/5`;
  
  // Clear previous choices and result
  choicesEl.innerHTML = '';
  resultEl.classList.add('hidden');
  nextBtn.classList.add('hidden');
  
  // Shuffle and display choices
  const shuffledChoices = shuffleArray(currentQuestion.choices);
  
  shuffledChoices.forEach(choice => {
    const button = document.createElement('button');
    button.className = 'choice-btn';
    button.textContent = choice;
    button.addEventListener('click', () => handleChoiceClick(choice, button));
    choicesEl.appendChild(button);
  });
}

// Handle choice click
function handleChoiceClick(choice, button) {
  if (userAnswer !== null) return; // Prevent multiple selections
  
  userAnswer = choice;
  const isCorrect = choice === currentQuestion.answer;
  
  // Disable all buttons
  const allButtons = document.querySelectorAll('.choice-btn');
  allButtons.forEach(btn => {
    btn.disabled = true;
    
    // Highlight correct answer
    if (btn.textContent === currentQuestion.answer) {
      btn.classList.add('correct');
    }
    
    // Highlight user's wrong answer
    if (btn === button && !isCorrect) {
      btn.classList.add('incorrect');
    }
  });
  
  // Update score
  if (isCorrect) {
    score++;
    scoreEl.textContent = score;
    showResult(true);
  } else {
    showResult(false);
  }
  
  // Show next button
  nextBtn.classList.remove('hidden');
  
  // Show restart button
  if (currentQuestionIndex < 5) {
    restartBtn.classList.remove('hidden');
  }
}

// Show result
function showResult(isCorrect) {
  resultEl.classList.remove('hidden', 'correct', 'incorrect');
  
  if (isCorrect) {
    resultEl.classList.add('correct');
    resultEl.textContent = '🎉 Correct! Well done!';
  } else {
    resultEl.classList.add('incorrect');
    resultEl.textContent = `❌ Incorrect! The correct answer is: ${currentQuestion.answer}`;
  }
}

// Show final screen
function showFinalScreen() {
  quizContent.classList.add('hidden');
  finalScreen.classList.remove('hidden');
  finalScoreEl.textContent = score;
  
  // Set message based on score
  if (score === 5) {
    finalMessageEl.textContent = 'Perfect! You got all questions right! 🌟';
  } else if (score >= 3) {
    finalMessageEl.textContent = 'Great job! You did well! 👏';
  } else {
    finalMessageEl.textContent = 'Good effort! Try again to improve! 💪';
  }
}

// Reset game
function resetGame() {
  currentQuestionIndex = 0;
  score = 0;
  usedQuestions = [];
  currentQuestion = null;
  userAnswer = null;
  
  scoreEl.textContent = '0';
  questionCountEl.textContent = '0/5';
  
  quizContent.classList.remove('hidden');
  finalScreen.classList.add('hidden');
  restartBtn.classList.add('hidden');
  
  displayQuestion();
}

// Event listeners
nextBtn.addEventListener('click', () => {
  if (currentQuestionIndex < 5) {
    displayQuestion();
  } else {
    showFinalScreen();
  }
});

restartBtn.addEventListener('click', resetGame);
playAgainBtn.addEventListener('click', resetGame);

// Initialize game
displayQuestion();
