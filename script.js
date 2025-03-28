const questions = [
    {
      question: "What does HTML stand for?",
      answers: [
        { text: "Hyper Text Markup Language", correct: true },
        { text: "Home Tool Markup Language", correct: false },
        { text: "Hyperlinks and Text Markup Language", correct: false },
        { text: "Hyper Tool Markup Language", correct: false }
      ]
    },
    {
      question: "Which language is primarily used for web development?",
      answers: [
        { text: "Python", correct: false },
        { text: "Java", correct: false },
        { text: "C++", correct: false },
        { text: "JavaScript", correct: true }
      ]
    },
    {
      question: "Which of the following is a popular version control system?",
      answers: [
        { text: "GitHub", correct: true },
        { text: "Jenkins", correct: false },
        { text: "Docker", correct: false },
        { text: "Kubernetes", correct: false }
      ]
    },
    {
      question: "Which of the following is not a programming language?",
      answers: [
        { text: "Python", correct: false },
        { text: "HTML", correct: true },
        { text: "Java", correct: false },
        { text: "C++", correct: false }
      ]
    },
    {
      question: "What does CSS stand for?",
      answers: [
        { text: "Cascading Style Sheets", correct: true },
        { text: "Computer Style Sheets", correct: false },
        { text: "Creative Style Sheets", correct: false },
        { text: "Colorful Style Sheets", correct: false }
      ]
    }
  ];
  const questionElement = document.getElementById("questions");
  const answerButtons = document.getElementById("answer-buttons");
  const nextButton = document.getElementById("next-btn");

  let currentQuestionIndex = 0;
  let score = 0;

  function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "next";
    showQuestion();
  }
    
  function showQuestion(){
    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
  
    currentQuestion.answers.forEach(answer => {
      const button = document.createElement("button");
      button.innerHTML = answer.text;
      button.classList.add("btn");
      answerButtons.appendChild(button);

      if(answer.correct){
        button.dataset.correct = answer.correct;
      }

      button.addEventListener("click", selectAnswer)
    })
  }

  function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
      answerButtons.removeChild(answerButtons.firstChild);
    }
  }
 function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if(isCorrect){
      selectedBtn.classList.add("correct");
      score++;
    }else{
      selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
      if (button.dataset.correct) {
        button.classList.add("correct");
      }
      button.disabled = true;
    });
    nextButton.style.display = "block";
 }
 function showScore(){
  resetState();
  questionElement.innerHTML = `You Scored ${score} out of ${questions.length}`;
  nextButton.innerHTML = "RESTART";
  nextButton.style.display = "block";
 }
 function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    showQuestion();
  }
   else{
    showScore();
 }
} 

 nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
      handleNextButton();
    }else{
      startQuiz();
    }
 })
  startQuiz();