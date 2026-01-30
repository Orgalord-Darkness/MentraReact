import {useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import type { Category } from './types/mentra-react.ts';
import urlFetch from'./components/UrlFetch.tsx';
import AnswersList from './components/AnswersList.tsx'; 
import {decodeHtml} from './utils/domParser.tsx';  
import FormSelectQuiz from './components/FormSelectQuiz.tsx'; 
import type {useEffectCheckRoundProps} from './types/mentra-react.ts';

function App() {
  const [chrono] = useState<number>(15);
  const timerRef = useRef<number | null>(null); 
  const urlCategories = 'https://opentdb.com/api_category.php';
  const [start, setStart] = useState<boolean>(false);
  const [end, setEnd] = useState<boolean>(false);
  const [canFetch, setCanFetch] = useState<boolean>(false);   
  const [categories, setCategories] = useState<Category[]>([]);
  const [difficulty, setDifficulty] = useState<string>('easy');
  const [nbQuestions, setNbQuestions] = useState<number>(10);
  const [category, setCategory] = useState<number>(9);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [compteur, setCompteur] = useState<number>(chrono);
  const [score, setScore] = useState<number>(0);
  const [pourcentage, setPourcentage] = useState<number>(0);  

  const {results, errors, loading} = urlFetch(nbQuestions, difficulty, category, canFetch,);   
  const correct_answer = results[currentQuestion]?.correct_answer;

  useEffect(() => {
    fetch(urlCategories)
      .then(res => res.json())
      .then(data => {
        setCategories(data.trivia_categories);
      });
  }, []);

  useEffect(() => {
    if (!start) {
      return;
    } 
    if (compteur === 0) {
      return; 
    }

    const timer = setTimeout(() => {
      setCompteur(prev => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [start, compteur]);


  useEffect(() => {
    if (!start) return;

    if (compteur === 0) {
      if (timerRef.current) clearTimeout(timerRef.current);
      
      if(selectedAnswer === correct_answer) {
        setScore(prev => prev + 1); 
      }
      
      setSelectedAnswer("");

      if (currentQuestion + 1 < results.length) {
        setCurrentQuestion(prev => prev + 1);
        setCompteur(chrono);
      } else {
        
        if(selectedAnswer === correct_answer) {
          setScore(prev => prev + 1); 
        } 
        
        setPourcentage((score / results.length) * 100);
        setStart(false);
        setEnd(true);
        setCanFetch(false);
      }

      return; 
    }

    timerRef.current = window.setTimeout(() => {

      if(selectedAnswer === correct_answer) {
        setScore(prev => prev + 1); 
      }
      
      setSelectedAnswer("");

      if (currentQuestion + 1 < results.length) {
        setCurrentQuestion(prev => prev + 1);
        setCompteur(chrono);
      } else {
        
        if(selectedAnswer === correct_answer) { 
          setScore(prev => prev + 1); 
        }
        
        setPourcentage((score / results.length) * 100);
        setStart(false);
        setEnd(true);
        setCanFetch(false);
      }
    }, 5000);

    return () => clearTimeout(timerRef.current!);
  
  }, [start, compteur, currentQuestion]);


  if(errors && errors.length > 0) {
    return (
      <div>
        <h2 className="text-red-700 font-bold underline text-xl"> Erreurs lors du fetch de l'API : </h2> 
        <ul> 
          {errors.map((error, index) => ( 
            <li key={index} className="m-2"> 
                <button className="bg-red-600 !bg-red-600 text-white px-3 py-2 rounded"> {error} </button>      
            </li> 
          ))} 
        </ul>
      </div>
    );
  }

  if(loading) {
    return <h2>Chargement...</h2>;
  }

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
      {!start && (
        <FormSelectQuiz 
          categories={categories}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          category={category}
          setCategory={setCategory}
          nbQuestions={nbQuestions}
          setNbQuestions={setNbQuestions}
          setStart={setStart}
          setEnd={setEnd}
          setCanFetch={setCanFetch}
          timerRef={timerRef}
          setScore={setScore}
          setCurrentQuestion={setCurrentQuestion}
          setSelectedAnswer={setSelectedAnswer}
          chrono={chrono}
          setCompteur={setCompteur}
          />
      )} {(start && !end && (
        <>
        <h2>Temps restant : {compteur} secondes</h2>
          <ul>
            {
              start && results.length > 0 && (
                <div>
                  <h2 className="mb-2">Question {currentQuestion + 1} / {results.length}</h2>
                  <p className="mb-2">{decodeHtml(results[currentQuestion]?.question)}</p>
                  <AnswersList
                    incorrectAnswers={results[currentQuestion]?.incorrect_answers || []}
                    goodAnswer={results[currentQuestion]?.correct_answer || ''}
                    setSelectedAnswer={setSelectedAnswer}
                    setCompteur={setCompteur}
                    currentQuestion={currentQuestion}
                    setCurrentQuestion={setCurrentQuestion}
                    max={results.length}
                    setStart={setStart}
                    score={score}
                    chrono={chrono}
                    clearTimer={() => { if (timerRef.current) clearTimeout(timerRef.current); }}
                  />
                </div>
              )
            }
          </ul>
        </>
      ))}
      {!start && end && (
        
        <div className="mt-8">
          <h2 className="text-center font-bold text-xl">Quiz terminé !</h2>
          {pourcentage >= 80 && <p className="text-center text-green-500">Félicitations !</p>}
          {pourcentage < 80 && pourcentage >  70 && <p className="text-green-700">Bien !</p>} 
          {pourcentage < 70 && pourcentage > 50 && <p className="text-yellow-500">Pas mal !</p>}
          {pourcentage < 50 && pourcentage > 30 && <p className="text-orange-500">Peut mieux faire !</p>}
          {pourcentage < 30 && <p className="text-center text-red-500">Recommence !</p>}
          <p className="text-center">Score final : {score}/{results.length}</p>
          <p className="text-center">Pourcentage de bonnes réponses : {Math.round(pourcentage)}%</p>
          
        </div>
      )}
    </>
  );
}


export default App
