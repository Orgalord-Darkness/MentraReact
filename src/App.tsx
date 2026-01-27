import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import type { Category } from './types/mentra-react.ts';
import urlFetch from'./components/UrlFetch.tsx';
import AnswersList from './components/AnswersList.tsx';
import CheckAnswer from './components/CheckAnswer.tsx';

function App() {
  const [chrono,setChrono] = useState<number>(15);
  const timerRef = useRef<number | null>(null); 
  const urlCategories = 'https://opentdb.com/api_category.php';
  const [start, setStart] = useState<boolean>(false);
  const [canFetch, setCanFetch] = useState<boolean>(false);   
  const [categories, setCategories] = useState<Category[]>([]);
  const [difficulty, setDifficulty] = useState<string>('easy');
  const [nbQuestions, setNbQuestions] = useState<number>(10);
  const [category, setCategory] = useState<number>(9);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [compteur, setCompteur] = useState<number>(chrono);
  const [score, setScore] = useState<number>(0);

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



  // useEffect(() => {
  //   if (compteur === 0) {
  //     return;
  //   };
  //   if(start) {
  //     timerRef.current = setTimeout(() => {
  //       const check = {
  //         selectedAnswer: selectedAnswer,
  //         goodAnswer: correct_answer
  //       }   
        
  //       if(currentQuestion + 1 < results.length) {
  //         setScore((prev) => prev + CheckAnswer(check));
  //         setCurrentQuestion(currentQuestion + 1);
  //         setCompteur(chrono);
  //       } else {
  //         window.alert(`Quiz terminé ! Score : ${score}/${results.length}`);
  //         setStart(false);
  //         setCurrentQuestion(0);
  //         setCompteur(chrono); 
  //       }
  //     }, 5000);
  //     return () => clearTimeout(timerRef.current!);
  //   }
  // },[start, currentQuestion, results, compteur]);

  useEffect(() => {
    if (!start) return;

    if (compteur === 0) {
      if (timerRef.current) clearTimeout(timerRef.current);

      const check = {
        selectedAnswer,
        goodAnswer: correct_answer
      };

      setScore(prev => prev + CheckAnswer(check));
      setSelectedAnswer("");

      if (currentQuestion + 1 < results.length) {
        setCurrentQuestion(prev => prev + 1);
        setCompteur(chrono);
      } else {
        window.alert(`Quiz terminé ! Score : ${score + CheckAnswer(check)}/${results.length}`);
        setStart(false);
      }

      return; 
    }

    timerRef.current = window.setTimeout(() => {
      const check = {
        selectedAnswer,
        goodAnswer: correct_answer
      };

      setScore(prev => prev + CheckAnswer(check));
      setSelectedAnswer("");

      if (currentQuestion + 1 < results.length) {
        setCurrentQuestion(prev => prev + 1);
        setCompteur(chrono);
      } else {
        window.alert(`Quiz terminé ! Score : ${score + CheckAnswer(check)}/${results.length}`);
        setStart(false);
      }
    }, 5000);

    return () => clearTimeout(timerRef.current!);
  }, [start, compteur, currentQuestion, results]);


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
      {!start ? (
        <form onSubmit={(e) => { 
          e.preventDefault();
          setStart(true); 
          setCanFetch(true);
           if (timerRef.current) 
            clearTimeout(timerRef.current);
            setScore(0); 
            setCurrentQuestion(0); 
            setSelectedAnswer(""); 
            setCompteur(chrono); 
          }} 
          className='flex flex-col gap-4 mt-8'>
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
        <h2>Temps restant : {compteur} secondes</h2>
          <ul>
            {
              start && results.length > 0 && (
                <div>
                  <h2 className="mb-2">Question {currentQuestion + 1} / {results.length}</h2>
                  <p className="mb-2">{results[currentQuestion]?.question}</p>
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
      )}
    </>
  );
}


export default App
