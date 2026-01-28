import { useState } from 'react';
import questions from './questions.json';

function QuestionCard() {
  
  function getRandomQuestion() {
    const index = Math.floor(Math.random() * questions.length);
    return questions[index];
  }

  const [currentQuestion, setCurrentQuestion] = useState(getRandomQuestion());

  function handleClickChoice(choice) {
    console.log("You chose: " + choice);
  }


  return (
    <div className="question-card">
      <h2 className='prompt'>{currentQuestion.promptText}</h2>

      <div className="choices">
        {currentQuestion.choices.map((choice) => (
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
