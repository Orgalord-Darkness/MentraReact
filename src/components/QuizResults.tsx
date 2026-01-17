import {useState, useEffect} from 'react'; 
import type {Question} from './../types/mentra-react.ts';
import AnswersList from './../components/AnswersList.tsx'; 

export function QuizResults(){
    const url ='https://opentdb.com/api.php?amount=10&difficulty=easy';
    const [results, setResults] = useState<Question[]>([]); 
    useEffect(()=> {
        fetch(url)
        .then(res => res.json())
        .then(data => {
           setResults(
            data.results.map((q: Question, index: number) => ({
                ...q,
                id: index + 1
            }))
            );
 
        })
    }, [])

    return(
    <>  
        <h2>Voici les résultats : </h2>
        {results.map(
            (result, index) =>(
                <div style={{ marginTop: '5px'}}> 
                    <p className='font-bold'>Question n°{index + 1}: {result.question}</p>
                    <AnswersList 
                        incorrectAnswers={result.incorrect_answers}
                        goodAnswer = {result.correct_answer} 
                    ></AnswersList>
                </div>
                
            )
        )}
        {console.log(results)}    
    </>
    ); 
}