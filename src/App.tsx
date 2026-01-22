import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import {QuizResults} from'./components/QuizResults.tsx'; 
// import InputDifficulty from'./components/InputDifficulty.tsx'; 
// import InputNbQuestions from'./components/InputNbQuestions.tsx'; 
// import InputCategories from'./components/InputCategories.tsx'; 
import './App.css'
import type { Category } from './types/mentra-react.ts';
import urlFetch from'./components/UrlFetch.tsx';
import AnswersList from './components/AnswersList.tsx';

function App() {
  const urlCategories ='https://opentdb.com/api_category.php';
  const [categories, setCategories] = useState<Category[]>([]); 

  const [difficulty, setDifficulty] = useState<string>('easy');
  const [nbQuestions, setNbQuestions] = useState<number>(10);
  const [category, setCategory] = useState<number>(9);  

  const results = urlFetch(nbQuestions, difficulty, category);

  useEffect(()=> {
      fetch(urlCategories)
      .then(res => res.json())
      .then(data => {
          setCategories(data.trivia_categories);
      })
  }, [])
console.log('results : ', results);
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
      <label>Difficulté : </label>
      <select 
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
        className = 'border px-2 py-2'>
          <option value="easy">Facile</option>
          <option value="medium">Moyen</option>
          <option value="hard">Difficile</option>
      </select>
      <label>Catégorie : </label>
        <select 
        value={category}
        onChange={(e) => setCategory(Number(e.target.value))}
        className = 'border px-2 py-2'>
        {categories.map((category) =>( 
            console.log(category), 
            <option value={category.id}>{category.name}</option>
        ),
        )}
        </select>
        <label>Nombre de questions : </label>
        <input type="number" 
        value={nbQuestions} 
        onChange={(e) => setNbQuestions(Number(e.target.value))} 
        className="border"/>

        <h2>Résultats : </h2>
        {/* {console.log(results)} */}
        <ul>
          {results.map((question) => (
            <div key={question.id}>
              <li>{question.question}</li>
              <AnswersList incorrectAnswers={question.incorrect_answers} goodAnswer={question.correct_answer}/>
            </div>
          ))}
        </ul>
      {/* <InputCategories/>
      <InputDifficulty/>
      <InputNbQuestions/> */}
      {/* <InputCategories/> */}
      {/* <div className="card">
          <QuizResults/>
      </div> */}
    </>
  )
}

export default App
