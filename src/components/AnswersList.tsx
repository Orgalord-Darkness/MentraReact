import {randomInt, randElement} from './../utils/random.tsx'; 
import {useState, useEffect} from 'react'; 
import type {AnswersListProps} from './../types/mentra-react.ts'; 

export default function AnswersList({incorrectAnswers, goodAnswer}: AnswersListProps){
    const answers: any = [...incorrectAnswers, goodAnswer];  

    const [randomNumber, setRandomNumber] = useState<number>(0);
    const [numbers, setNumbers] = useState<number[]>([]); 
    const [numbersHistory, setHistory] = useState<number[]>([]); 

    // useEffect(() => { 
    //     answers.map(() => {
    //         const rand = randomInt(answers.length - 1)
    //         setRandomNumber(rand); 
    //         if(!numbersHistory.includes(rand)){
    //             setNumbers(prev => [...prev, rand])
    //             setHistory(prev => [...prev, rand])
    //         }
             
    //     })
        
    // }, [answers, numbers, numbersHistory]);

    useEffect(() => {
        const answers = [...incorrectAnswers, goodAnswer];
        const stockRand: number[] = [];

        answers.forEach(() => {
            const rand = randomInt(answers.length - 1);
            if (!stockRand.includes(rand)) {
                stockRand.push(rand);
            }
        });

        setNumbers(stockRand);
        setHistory(stockRand);
    }, [incorrectAnswers, goodAnswer]);

    return( 
        <>  
        <form>
            <ul>
                {answers.map((answer: string) => 
                    (<li>
                        <label> 
                            <input name="answer" type="radio" value={answer}/> 
                            {answer}
                        </label>   
                    </li>),
                    <br></br>
                )} 
            </ul>
        </form>
        </>
          
        );
}