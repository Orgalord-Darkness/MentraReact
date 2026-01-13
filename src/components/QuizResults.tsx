import {useState, useEffect} from 'react'; 
import type Question from './../types/mentra-react.ts'

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
            (result) =>(
                compteur = compteur +1,
                <section style={{ marginTop: '5px'}}> 
                    <p>{compteur } {result.question}</p>
                    <ul>
                        {result.incorrect_answers.map(
                            (answer) => (
                                <li>. {answer}</li>
                            )
                            
                        )}
                        <li>{result.correct_answer}</li>
                    </ul>
                </section>
                
            )
        )}
        ${console.log(results)
}    </>
    ); 
}