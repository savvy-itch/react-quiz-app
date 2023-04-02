import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

const CATEGORIES = 'https://the-trivia-api.com/api/categories';
const QUESTIONS = 'https://the-trivia-api.com/api/questions?';
const HEADERS = {'Content-Type': 'application/json'};

export default function QuizSettingsForm({ setQuizBegan, onQuestionsChange }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('arts,literature,arts_and_literature');
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy');
  const [selectedQNumber, setSelectedQNumber] = useState(5);

  function fetchCategories() {
    return fetch(CATEGORIES)
    .then(response => response.json())
    .then(categories => setCategories(categories))
    .catch(error => console.log(error));
  }

  function fetchQuestions() {
    return fetch(`${QUESTIONS}categories=${selectedCategory}&limit=${selectedQNumber}&difficulty=${selectedDifficulty}`, {HEADERS,})
    .then(response => response.json())
    .then(questions => {
      onQuestionsChange(questions);
    })
    .catch(error => console.log(error));
  }

  // display categories on page load
  useEffect(() => {
    fetchCategories();
  }, []);

  function handleClick() {
    fetchQuestions();
    // if settings values are truthy
    if (selectedCategory && selectedDifficulty) {
      setQuizBegan(true);
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Please choose correct values',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }

  function handleCategoryChange(e) {
    setSelectedCategory(e.target.value);
  }

  function handleDifficultyChange(e) {
    setSelectedDifficulty(e.target.value);
  }

  function handleRangeChange(e) {
    setSelectedQNumber(e.target.value);
  }

  return (
    <div className="modal modal-sheet position-static d-block p-4 py-md-5" tabIndex="-1" role="dialog" id="modalSheet">
      <div className="modal-dialog" role="document">
        <div className="modal-content rounded-4 shadow">
          <h1 className="modal-title fs-2 text-center my-2">Quiz App</h1>
          <h2 className='fs-3 text-center'>Choose your quiz configuration</h2>
      
          <div className="modal-body py-0">
            <div className="mb-3">
              <div className="my-4">
                <label htmlFor="category-select">Category</label>
                <select 
                  id="category-select"
                  className="form-select mt-3" 
                  aria-label="Default select example" 
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  {Object.entries(categories).map(([key, value]) => {
                    return (
                      <option key={key} value={value}>{key}</option>
                    )
                  })}
                </select>
              </div>

              <div className="my-4">
                <label htmlFor="difficulty-select">Difficulty</label>
                <select 
                  id="difficulty-select"
                  className="form-select mt-3" 
                  aria-label="Default select example" 
                  value={selectedDifficulty}
                  onChange={handleDifficultyChange}
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

              <div>
                <label htmlFor="customRange1" className="form-label mt-2">Number of questions: 
                  <span id="numberOfQuestions" onChange={handleRangeChange}> {selectedQNumber}</span>
                </label>
                <input type="range" className="form-range" id="customRange1" min="5" max="20" step="1" value={selectedQNumber} onChange={handleRangeChange}></input>
              </div>
            </div>
          </div>
          <div className="modal-footer flex-column align-items-stretch w-100 gap-2 pb-3 border-top-0">
            <button 
              type="button" 
              className="btn btn-lg btn-primary"
              onClick={handleClick}
            >
              Start Quiz!
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
// 120