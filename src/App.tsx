import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {QuizResults} from'./components/QuizResults.tsx'; 
import InputDifficulty from'./components/InputDifficulty.tsx'; 
import InputNbQuestions from'./components/InputNbQuestions.tsx'; 
import InputCategories from'./components/InputCategories.tsx'; 
import './App.css'

function App() {

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
      <InputCategories/>
      <InputDifficulty/>
      <InputNbQuestions/>
      {/* <InputCategories/> */}
      <div className="card">
          <QuizResults/>
      </div>
    </>
  )
}

export default App
