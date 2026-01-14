import {useState, useEffect} from 'react'; 
import type {Question} from './../types/mentra-react.ts'
import AnswersList from './../components/AnswersList.tsx'; 

export function QuizResults(){
    let compteur = 0; 
    const url ='https://opentdb.com/api.php?amount=10&difficulty=easy';
    // const default_question: Question[] = [{
    //     id: 1, 
    //     type: 'test', 
    //     difficulty: 'easy', 
    //     category: 'Culture Général', 
    //     question: 'ça va ?', 
    //     correct_answer: 'oui',
    // }]
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
            (result,index) =>(
                <section key={index} style={{ marginTop: '5px'}}> 
                    <p>Question : {result.question}</p>
                    <AnswersList 
                        incorrectAnswers={result.incorrect_answers}
                        goodAnswer = {result.correct_answer} 
                    ></AnswersList>
                </section>
                
            )
        )}
        {console.log(results)}    
    </>
    ); 
}