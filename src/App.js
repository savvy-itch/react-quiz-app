import { useState } from "react";
import QuizSettingsForm from "./components/QuizSettingsForm";
import Question from "./components/Question";
import ThemeToggle from "./components/ThemeToggle";
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
      <ThemeToggle />
      {/* if user clicked Start Quiz button */}
      {quizBegan ? (
        <QuizContext.Provider value={{ failedQuestions, setQuizBegan, setFailedQuestions }}>
          <Question 
            questions={questions}
            handleAnswer={handleAnswer}
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