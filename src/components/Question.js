import React, { useState } from "react";
import Loading from "./Loading";
import Results from "./Results";

export default function Question({ questions, handleAnswer }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  if (!questions || questions.length === 0) {
    return <Loading />;
  }

  // If no more questions left, display results
  if (currentQuestion > questions.length - 1) {
    return (
      <Results
        questions={questions}
        setCurrentQuestion={setCurrentQuestion}
      />
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
    // if user skips the question
    if (e.target.id === 'next-question-btn') {
      handleAnswer(questions[currentQuestion].id, '', questions[currentQuestion].correctAnswer);
    } else {
      handleAnswer(questions[currentQuestion].id, e.target.textContent, questions[currentQuestion].correctAnswer);
    }
    setCurrentQuestion(currentQuestion + 1);
  }

  return (
    <div className="modal modal-sheet position-static d-block py-md-5">
      <div className="modal-dialog modal-lg modal-fullscreen-sm-down">
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