
const $startGameButton = document.querySelector(".start-quiz")
const $nextQuestionButton = document.querySelector(".next-question")
const $questionsContainer = document.querySelector(".questions-container")
const $questionText = document.querySelector(".question")
const $answersContainer = document.querySelector(".answers-container")
const $answers = document.querySelectorAll(".answer")

let currentQuestionIndex = 0
let totalCorrect = 0

$startGameButton.addEventListener("click", startGame)
$nextQuestionButton.addEventListener("click", displayNextQuestion)

function startGame() {
  $startGameButton.classList.add("hide")
  $questionsContainer.classList.remove("hide")
  displayNextQuestion()
}

function displayNextQuestion() {
  resetState()
  
  if (questions.length === currentQuestionIndex) {
    return finishGame()
  }

  $questionText.textContent = questions[currentQuestionIndex].question
  questions[currentQuestionIndex].answers.forEach(answer => {
    const newAsnwer = document.createElement("button")
    newAsnwer.classList.add("button", "answer")
    newAsnwer.textContent = answer.text
    if (answer.correct) {
      newAsnwer.dataset.correct = answer.correct
    }
    $answersContainer.appendChild(newAsnwer)

    newAsnwer.addEventListener("click", selectAnswer)
  })
}

function resetState() {
  while($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild)
  }

  document.body.removeAttribute("class")
  $nextQuestionButton.classList.add("hide")
}

function selectAnswer(event) {
  const answerClicked = event.target

  if (answerClicked.dataset.correct) {
    document.body.classList.add("correct")
    totalCorrect++
  } else {
    document.body.classList.add("incorrect") 
  }

  document.querySelectorAll(".answer").forEach(button => {
    button.disabled = true

    if (button.dataset.correct) {
      button.classList.add("correct")
    } else {
      button.classList.add("incorrect")
    }
  })
  
  $nextQuestionButton.classList.remove("hide")
  currentQuestionIndex++
}

function finishGame() {
  const totalQuestions = questions.length
  const performance = Math.floor(totalCorrect * 100 / totalQuestions)
  
  let message = ""

  switch (true) {
    case (performance >= 90):
      message = "Merece um diploma!"
      break
    case (performance >= 70):
      message = "Muito bom, quase perrrfeito!"
      break
    case (performance >= 50):
      message = "Vc pode melhorar!"
      break
    default:
      message = "Poderia ser melhor..."
  }

  $questionsContainer.innerHTML = 
  `
    <p class="final-message">
      Você acertou ${totalCorrect} de ${totalQuestions} questões!
      <span>Resultado: ${message}</span>
    </p>
    <button 
      onclick=window.location.reload() 
      class="button"
    >
      Refazer teste
    </button>
  `
}


const questions = [
  {
    question: "Qual é uma das principais doenças que afetam animais silvestres resgatados do tráfico ilegal?",
    answers: [
      { text: "Sarampo", correct: false },
      { text: "Toxoplasmose", correct: false },
      { text: "Tuberculose", correct: true },
      { text: "Leptospirose", correct: false }
    ]
  },
  {
    question: "Qual é o impacto ambiental da criação intensiva de gado?",
    answers: [
      { text: "Desmatamento e emissões de gases de efeito estufa", correct: true },
      { text: "Redução de gases do efeito estufa", correct: false },
      { text: "Aumento da biodiversidade", correct: false },
      { text: "Aumento da qualidade da água", correct: false }
    ]
  },
  {
    question:'Qual animal silvestre é mais frequentemente vítima de atropelamentos em rodovias brasileiras?',
    answers: [
      { text: 'Tatu', correct: true },
      { text: 'Jaguatirica', correct: false },
      { text: 'Lobo-guará', correct: false },
      { text: "Tamanduá", correct: false }
    ]
  },
  {
    question: 'O movimento "Abril Laranja" tem como objetivo principal a promoção da adoção de animais abandonados.',
    answers: [
      { text: "Verdadeiro", correct: false },
      { text: "Falso", correct: true }
    ]
  },
  {
    question: 'Qual animal marinho é conhecido por ajudar no controle da população de ouriços-do-mar e preservar os recifes de coral?',
    answers: [
      { text: 'Tubarão', correct: false },
      { text: 'Lontra marinha', correct: true },
      { text: 'Polvo', correct: false },
      { text: 'Tartaruga', correct: false }
    ]
  },
  {
    question: 'Qual é o principal componente nutricional necessário para o desenvolvimento saudável de filhotes de cães?',
    answers: [
      { text: 'Fibras', correct: false },
      { text: 'Proteínas', correct: true },
      { text: 'Vitaminas', correct: false },
      { text: 'Carboidratos', correct: false }
    ]
  },
  {
    question: 'Qual legislação no Brasil regulamenta os direitos dos animais e combate os maus-tratos?',
    answers: [
      { text: 'Lei Joca', correct: false },
      { text: 'Constituição Federal', correct: false },
      { text: 'Código Florestal Brasileiro', correct: false },
      { text: 'Lei de Proteção Ambiental (Lei n.º 9.605/1998)', correct: true },
    ]
  },
]
