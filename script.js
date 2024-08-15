const questions = [
  {
    question: "Which of the following is not a javascript data type?",
    answers: [
      { text: "string", correct: false },
      { text: "number", correct: false },
      { text: "boolean", correct: false },
      { text: "character", correct: true },
    ],
  },
  {
    question: "How do you declare a javascript variable?",
    answers: [
      { text: "var carName;", correct: false },
      { text: "variable carName;", correct: false },
      { text: "v carName;", correct: false },
      { text: "var = carName;", correct: true },
    ],
  },
  {
    question: "Which operator is used to assign a value to a variable?",
    answers: [
      { text: "*", correct: false },
      { text: "+", correct: false },
      { text: "=", correct: true },
      { text: "/", correct: false },
    ],
  },
  {
    question: "What is the output of\nconsole.log(typeof null)?",
    answers: [
      { text: "object", correct: true },
      { text: "null", correct: false },
      { text: "undefined", correct: false },
      { text: "string", correct: false },
    ],
  },
  {
    question: "What is the purpose of let keyword in javascript?",
    answers: [
      { text: "To declare a global variable", correct: false },
      { text: "To declare a local variable", correct: true },
      { text: "To declare a constant variable", correct: false },
      { text: "To declare a function", correct: false },
    ],
  },
  {
    question: "Which of the following is a valid javascript variable name? ",
    answers: [
      { text: "123abc", correct: false },
      { text: "_abc123", correct: true },
      { text: "abc-123", correct: false },
      { text: "abc 123", correct: false },
    ],
  },
  {
    question:
      "Which of the following methods is used to add an element to the end of an array in javascript? ",
    answers: [
      { text: "push()", correct: true },
      { text: "pop()", correct: false },
      { text: "shift()", correct: false },
      { text: "splice()", correct: false },
    ],
  },
  {
    question: "Which of the following loops is used to iterate over an array? ",
    answers: [
      { text: "for...of", correct: true },
      { text: "for...in", correct: false },
      { text: "While", correct: false },
      { text: "do...while", correct: false },
    ],
  },
  {
    question: "Which of the following is not a javascript framework? ",
    answers: [
      { text: "Angular", correct: false },
      { text: "React", correct: false },
      { text: "Vue.js", correct: false },
      { text: "Django", correct: true },
    ],
  },
  {
    question:
      "What is the output of the following code \t console.log(2 + '2')? ",
    answers: [
      { text: "4", correct: false },
      { text: "22", correct: true },
      { text: "16", correct: false },
      { text: "10", correct: false },
    ],
  },
];
const questionElement = document.getElementById("questions");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}
function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}
function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}
function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}
function showScore() {
  resetState();
  questionElement.innerHTML = `You score ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
