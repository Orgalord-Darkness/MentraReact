import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import type { Category } from './types/mentra-react.ts';
import urlFetch from'./components/UrlFetch.tsx';
import AnswersList from './components/AnswersList.tsx';

function App() {
  const urlCategories = 'https://opentdb.com/api_category.php';
  const [start, setStart] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const [difficulty, setDifficulty] = useState<string>('easy');
  const [nbQuestions, setNbQuestions] = useState<number>(10);
  const [category, setCategory] = useState<number>(9);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);

  const results = urlFetch(nbQuestions, difficulty, category);

  useEffect(() => {
    fetch(urlCategories)
      .then(res => res.json())
      .then(data => {
        setCategories(data.trivia_categories);
      });
  }, []);

  useEffect(() => {
    if(start) {
      const compteur = setTimeout(() => {
        if(currentQuestion + 1 < results.length) {
          setCurrentQuestion((prev) => prev + 1);
        }else if(currentQuestion + 1 === results.length) {
          window.alert(`Quiz terminé ! Score : ${currentQuestion + 1}/${results.length}`);
          setStart(false);
          setCurrentQuestion(0);
        }
      }, 200);
      return () => clearTimeout(compteur);
    }
  },[start, currentQuestion, results]);

  return (
    <>
      <div className='flex mx-auto'>
        <a className='mx-auto' href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a className='mx-auto' href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1 className="font-bold text-center mt-8">MentraReact</h1>

      {!start ? (
        <form onSubmit={(e) => { e.preventDefault(); setStart(true); }}>
          <label>Difficulté : </label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className='border px-2 py-2'
          >
            <option value="easy">Facile</option>
            <option value="medium">Moyen</option>
            <option value="hard">Difficile</option>
          </select>

          <label>Catégorie : </label>
          <select
            value={category}
            onChange={(e) => setCategory(Number(e.target.value))}
            className='border px-2 py-2'
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>

          <label>Nombre de questions : </label>
          <input
            type="number"
            value={nbQuestions}
            onChange={(e) => setNbQuestions(Number(e.target.value))}
            className="border"
          />

          <input
            type="submit"
            value="Lancer le quiz"
            className="border px-2 py-2 bg-blue-500 text-white"
          />
        </form>
      ) : (
        <>
          <h2>Résultats :</h2>
          <ul>
            {/* {results.map((question) => (
              <div key={question.id}>
                <li>{question.question}</li>
                <AnswersList
                  incorrectAnswers={question.incorrect_answers}
                  goodAnswer={question.correct_answer}
                />
              </div>
            ))} */}
            {
              start && results.length > 0 && (
                <div>
                  <h2>Question {currentQuestion + 1}</h2>
                  <p>{results[currentQuestion]?.question}</p>
                  <AnswersList
                    incorrectAnswers={results[currentQuestion]?.incorrect_answers || []}
                    goodAnswer={results[currentQuestion]?.correct_answer || ''}
                  />
                </div>
              )
            }
          </ul>
        </>
      )}
    </>
  );
}


export default App
