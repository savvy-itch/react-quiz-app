import React, { useContext } from 'react';
import QuizContext from "../context";

export default function Results({ questions, setCurrentQuestion }) {
  const { failedQuestions, setQuizBegan, setFailedQuestions } = useContext(QuizContext);

  function handleResetQuiz() {
    setQuizBegan(false);
    setCurrentQuestion(0);
    setFailedQuestions([]);
  }

  return (
    <div className="modal modal-sheet position-static d-block py-md-5">
      <div className="modal-dialog modal-lg modal-fullscreen-sm-down">
        <div className="modal-content rounded-4 shadow p-3 align-items-center">
          <h1 className="fs-3 mb-5">Congratulations! You've completed the quiz.</h1>
          <h2>Your result: {questions.length - failedQuestions.length} out of {questions.length}</h2>
          {/* If some questions were failed, display them */}
          {failedQuestions && (
            <ul className="list-group w-100 mt-4">
              {failedQuestions.map((fq) => (
                <li key={fq.questionId} className="list-group-item">
                  <p className="fs-5">{questions.find(q => q.id === fq.questionId).question}</p>
                  <p className="text-danger"> Your answer: {fq.selectedAnswer}</p>
                  <p className="text-success">Correct answer: {fq.correctAnswer}</p>
                </li>
              ))}
            </ul>
          )}
          <button className="btn btn-lg btn-primary mt-4" onClick={handleResetQuiz}>Try Again</button>
        </div>
      </div>
    </div>
  )
}