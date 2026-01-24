import {randomInt, randElement} from './../utils/random.tsx'; 
import {useState, useEffect} from 'react'; 
import type {AnswersListProps} from './../types/mentra-react.ts'; 

export default function AnswersList({incorrectAnswers, goodAnswer, setSelectedAnswer, setCompteur, currentQuestion, setCurrentQuestion, max, setStart,score}: AnswersListProps){
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
        <form className='mt-4 mb-4'
        onSubmit={(e) => {
            e.preventDefault();  
            setCompteur(5);
            if(currentQuestion + 1< max) {
                setCurrentQuestion(currentQuestion + 1);
            }else{
                window.alert(`Quiz terminé ! Score : ${score}/${max}`);
                setStart(false); 
                setCompteur(5);
                setCurrentQuestion(0);
            }
        }}>
            <ul>
                {answers.map((answer: string) => 
                    (<li>
                        <label> 
                            <input name="answer" type="radio" value={answer} onChange={(e) => setSelectedAnswer(e.target.value)}/> 
                            {answer}
                        </label>   
                    </li>),
                    <br></br>
                )} 
            </ul>
            <input type="submit" value="Valider" className="border px-2 py-2 bg-green-500 text-white"/>
        </form>
        </>
          
        );
}