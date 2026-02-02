import {randomizer} from './../utils/random.tsx'; 
import {useState, useEffect} from 'react'; 
import type {AnswersListProps} from './../types/mentra-react.ts';
import {decodeHtml} from './../utils/domParser.tsx';   

export default function AnswersList({incorrectAnswers, goodAnswer, setSelectedAnswer, setCompteur, clearTimer, setValidate}: AnswersListProps){

    const answers: any = [...incorrectAnswers, goodAnswer];  

    const [random, setRandom] = useState<string[]>([]);

    useEffect(() => { 
        randomizer(answers);
        setRandom(answers); 
    }, [incorrectAnswers, goodAnswer]);

    return( 
       <>
            <form
                className="mt-4 mb-4"
                onSubmit={(e) => {
                e.preventDefault();
                }}
            >
                <ul className="flex flex-col gap-3">
                {random.map((answer: string) => (
                    <li
                    key={answer}
                    className="bg-pink-50 border border-pink-300 rounded px-3 py-2 hover:bg-pink-100 transition"
                    >
                    <label className="flex items-center gap-2">
                        <input
                        name="answer"
                        type="radio"
                        value={answer}
                        onChange={(e) => setSelectedAnswer(e.target.value)}
                        />
                        {decodeHtml(answer)}
                    </label>
                    </li>
                ))}
                </ul>

                <input
                type="submit"
                value="Valider"
                onClick={() => {
                    setValidate(true);
                    clearTimer();
                    setCompteur(0);
                }}
                className="mt-4 px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                />
            </form>
        </>

        );
}