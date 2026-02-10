import { useState, useEffect } from 'react';
import questions from './questions.json';

function QuestionCard() {

  const [questionCount, setQuestionCount] = useState(0);
  const questionLimit = 10;
  
  

  function getRandomQuestion() {
    const index = Math.floor(Math.random() * questions.length);
    return questions[index];
  }

  function shuffle(array) {
    return [...array].sort(() => Math.random() - 0.5);
  }

  function buildChoices(allQuestions, correctAnswer) {
    const wrongPool = allQuestions
      .map((q) => q.answer)
      .filter((word) => word !== correctAnswer);

    const wrongChoices = shuffle(wrongPool).slice(0, 3);
    return shuffle([correctAnswer, ...wrongChoices]);
  }

  const firstQuestion = getRandomQuestion();
  

  const [currentQuestion, setCurrentQuestion] = useState(firstQuestion);
  const [choices, setChoices] = useState(
    buildChoices(questions, firstQuestion.answer)
  );

  const [gameOver, setGameOver] = useState(false);

  const [feedback, setFeedback] = useState("");

    function playPromptAudio() {
    if (!currentQuestion?.promptAudio) return;
    const audio = new Audio(currentQuestion.promptAudio);
    audio.currentTime = 0;
    audio.play().catch((err) => {
      console.log("Autoplay blocked until user interacts:", err);
    });
  }

  useEffect(() => {
    playPromptAudio();
  }, [currentQuestion]);

  function nextQuestion() {
    if (questionCount + 1 >= questionLimit) {
      setGameOver(true);
      return
    }

    setFeedback("");

    const q = getRandomQuestion();
    setCurrentQuestion(q);
    setChoices(buildChoices(questions, q.answer));

    setQuestionCount(prev => prev + 1);
  }


  function handleClickChoice(choice) {
    if (choice === currentQuestion.answer) {
      setFeedback("✅ Correct!");
      setTimeout(() => {
        nextQuestion();
      }, 1000);
    } else {
      setFeedback("❌ Try again!")
    }
  }

  

  function resetGame() {
    setGameOver(false);
    setQuestionCount(0);
    const q = getRandomQuestion();
    setCurrentQuestion(q);
    setChoices(buildChoices(questions, q.answer));
    setFeedback("");
  }

  if(gameOver) {
    return (
      <div className='question-card'>
        <h2 className='prompt'>Great Job!</h2>
        <p>You finished all 10 questions.</p>
        <button className='choice-button' onClick={resetGame}>
          Play Again
        </button>
      </div>
    )
  }

  return (
    <div className="question-card">
     

      {currentQuestion.promptImage && (
        <img
          src={currentQuestion.promptImage}
          alt="prompt"
          className="prompt-image"
          onClick={playPromptAudio}
          style={{ cursor: "pointer"}}
        />
      )}

      <h2 className='prompt'>{currentQuestion.promptText}</h2>

      {feedback && <p className="feedback">{feedback}</p>}


      <div className="choices">
        {choices.map((choice) => (
          <button
            key={choice}
            onClick={() => handleClickChoice(choice)}
            className="choice-button"
          >
            {choice}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuestionCard;
