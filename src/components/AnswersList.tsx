import {randomInt, randElement} from './../utils/random.tsx'; 
import {useState, useEffect} from 'react'; 
import type {AnswersListProps} from './../types/mentra-react.ts'; 

export default function AnswersList({incorrectAnswers, goodAnswer, setSelectedAnswer, setCompteur, currentQuestion, setCurrentQuestion, max, setStart,score, chrono, clearTimer}: AnswersListProps){

    const answers: any = [...incorrectAnswers, goodAnswer];  

    const [random, setRandom] = useState<string[]>([]);
    const [numbers, setNumbers] = useState<number[]>([]); 
    const [numbersHistory, setHistory] = useState<number[]>([]); 

    useEffect(() => { 

        for(let i = answers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [answers[i], answers[j]] = [answers[j], answers[i]];
        
        }
        setRandom(answers); 
    }, [incorrectAnswers, goodAnswer]);

    return( 
        <>  
        <form className='mt-4 mb-4'
        onSubmit={(e) => {
            e.preventDefault();  
            // setCompteur(chrono);
            // if(currentQuestion + 1< max) {
            //     setCurrentQuestion(currentQuestion + 1);
            // }else{
            //     window.alert(`Quiz terminé ! Score : ${score}/${max}`);
            //     setStart(false); 
            //     setCompteur(chrono);
            //     setCurrentQuestion(0);
            // }
        }}>
            <h5 className='mtb-4'>{goodAnswer}</h5>
            <div className='p-4'></div>
            <ul>
                {random.map((answer: string) => 
                    (<li>
                        <label> 
                            <input name="answer" type="radio" value={answer} onChange={(e) => setSelectedAnswer(e.target.value)}/> 
                            {answer}
                        </label>   
                    </li>),
                    <br></br>
                )} 
            </ul>
            <input type="submit"
             value="Valider" 
             onClick={() => {
                clearTimer() 
                setCompteur(0)
            }}
             className="border px-2 py-2 bg-green-500 text-white"/>
        </form>
        </>
          
        );
}