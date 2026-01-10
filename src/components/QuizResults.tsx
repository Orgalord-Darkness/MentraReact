import {useState, useEffect} from 'react'; 
import type Question from './../types/mentra-react.ts'

export function QuizResults(){
    const url ='https://opentdb.com/api.php?amount=10&difficulty=easy';
    const default_question: Question[] = [{
        id: 1, 
        type: 'test', 
        difficulty: 'easy', 
        category: 'Culture Général', 
        question: 'ça va ?', 
        correct_answer: 'oui',
    }]
    const [results, setResults] = useState<Question[]>(default_question); 
    useEffect(()=> {
        fetch(url)
        .then(res => res.json())
        .then(data => {
            setResults(data); 
        })
    }, [])

    return(
    <>  
        <h2>Voici les résultats : </h2>
        <p>{results.map(
            (result) =>(
                result.question
            )
        )}</p>
    </>
    ); 
}