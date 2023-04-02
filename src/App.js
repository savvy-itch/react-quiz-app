import { useState } from "react";
import QuizSettingsForm from "./components/QuizSettingsForm";
import Question from "./components/Question";
import QuizContext from "./context";

function App() {
  const [quizBegan, setQuizBegan] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [failedQuestions, setFailedQuestions] = useState([]);
  
  function handleQuestionsChange(newQuestions) {
    setQuestions(newQuestions);
  }

  const handleAnswer = (questionId, selectedAnswer, correctAnswer) => {
    if (selectedAnswer !== correctAnswer) {
      setFailedQuestions([...failedQuestions, {questionId, selectedAnswer, correctAnswer}]);
    }
  }

  return (
    <div className="App">
      {quizBegan ? (
        <QuizContext.Provider value={{ failedQuestions }}>
          <Question 
            questions={questions}
            handleAnswer={handleAnswer} 
            setQuizBegan={setQuizBegan}
            setFailedQuestions={setFailedQuestions}
          />
        </QuizContext.Provider>
      ) : (
        <QuizSettingsForm 
          setQuizBegan={setQuizBegan} 
          onQuestionsChange={handleQuestionsChange}
        />
      )}
    </div>
  );
}

export default App;