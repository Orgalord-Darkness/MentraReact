import {randomizer} from './../utils/random.tsx'; 
import {useState, useEffect} from 'react'; 
import type {AnswersListProps} from './../types/mentra-react.ts';
import {decodeHtml} from './../utils/domParser.tsx';   

export default function AnswersList({incorrectAnswers, goodAnswer, setSelectedAnswer, setCompteur, currentQuestion, setCurrentQuestion, max, setStart,score, chrono, clearTimer}: AnswersListProps){

    const answers: any = [...incorrectAnswers, goodAnswer];  

    const [random, setRandom] = useState<string[]>([]);

    useEffect(() => { 
        randomizer(answers);
        setRandom(answers); 
    }, [incorrectAnswers, goodAnswer]);

    return( 
        <>  
        <form className='mt-4 mb-4'
        onSubmit={(e) => {
            e.preventDefault();  
        }}>
            <h5 className='mtb-4'>{decodeHtml(goodAnswer)}</h5>
            <div className='p-4'></div>
            <ul>
                {random.map((answer: string) => 
                    (<li>
                        <label> 
                            <input name="answer" type="radio" value={answer} onChange={(e) => setSelectedAnswer(e.target.value)}/> 
                            {decodeHtml(answer)}
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