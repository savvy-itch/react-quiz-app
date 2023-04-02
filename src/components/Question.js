import React, { useContext, useState } from "react";
import Loading from "./Loading";
import QuizContext from "../context";

export default function Question({ questions, handleAnswer, setQuizBegan, setFailedQuestions }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { failedQuestions } = useContext(QuizContext);

  if (!questions || questions.length === 0) {
    return <Loading />;
  }

  function handleResetQuiz() {
    setQuizBegan(false);
    setCurrentQuestion(0);
    setFailedQuestions([]);
  }

  // If no more questions left, display results
  if (currentQuestion > questions.length - 1) {
    return (
      <div className="modal modal-sheet position-static d-block p-4 py-md-5">
        <div className="modal-dialog modal-lg">
          <div className="modal-content rounded-4 shadow p-3 align-items-center">
            <h1 className="fs-3 mb-5">Congratulations! You've completed the quiz.</h1>
            <h2>Your result: {questions.length - failedQuestions.length} out of {questions.length}</h2>
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

  function getRandomIndex() {
    let index = Math.floor(Math.random() * (questions[currentQuestion].incorrectAnswers.length + 1));
    return index;
  }

  // mix correct answer with incorrect answers at a random index
  let allAnswers = [...questions[currentQuestion].incorrectAnswers];
  allAnswers.splice(getRandomIndex(), 0, questions[currentQuestion].correctAnswer);

  function handleAnswerClick(e) {
    if (e.target.id === 'next-question-btn') {
      handleAnswer(questions[currentQuestion].id, '', questions[currentQuestion].correctAnswer);
    } else {
      handleAnswer(questions[currentQuestion].id, e.target.textContent, questions[currentQuestion].correctAnswer);
    }
    setCurrentQuestion(currentQuestion + 1);
  }

  return (
    <div className="modal modal-sheet position-static d-block p-4 py-md-5">
      <div className="modal-dialog modal-lg">
        <div className="modal-content rounded-4 shadow p-3 align-items-center">
          <p className="align-self-end fw-semibold text-primary-emphasis">Question 
            <span> {currentQuestion + 1}</span>/
            <span>{questions.length}</span>
          </p>
          <p className="fs-5 mb-5 mx-2 text-center">{questions[currentQuestion].question}</p>
          <ul className="list-group w-100">
            {allAnswers.map(a => {
              return (
                <li key={a} className="list-group-item">
                  <button className="btn btn-lg btn-light my-2 w-100" type="button" onClick={handleAnswerClick}>{a}</button>
                </li>
              )
            })}
          </ul>
          <button id="next-question-btn" className="btn btn-primary w-50 mt-4" type="button" onClick={handleAnswerClick}>Next Question</button>
        </div>
      </div>
    </div>
  )
}