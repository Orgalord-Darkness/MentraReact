import type { FinalMessageProps } from "../types/mentra-react";

export function FinalMessage({score, results, setStart, setEnd, setCanFetch, setScore, setCurrentQuestion, setSelectedAnswer, setCompteur, chrono}: FinalMessageProps) {
    const pourcentage = (score / results.length) * 100;
    
    const restartQuiz = () => {
        setEnd(false);
        setScore(0);
        setCurrentQuestion(0);
        setSelectedAnswer("");
        setCompteur(chrono);
        setCanFetch(true);
        setStart(true);
    };
    
    return (
        <div className="mt-10 p-6 bg-white shadow-xl rounded-xl max-w-md mx-auto border border-yellow-300">
            <h2 className="text-center text-2xl mb-4 text-yellow-600">
            Quiz terminé !
            </h2>

            {pourcentage >= 80 && <p className="text-center text-green-500 font-bold">Félicitations !</p>}
            {pourcentage < 80 && pourcentage >= 70 && <p className=" text-center text-green-700 font-bold">Bien joué !</p>}
            {pourcentage < 70 && pourcentage >= 50 && <p className="text-center text-yellow-500 font-bold">Pas mal !</p>}
            {pourcentage < 50 && pourcentage >= 30 && <p className="text-center text-orange-500 font-bold">Tu peux faire mieux !</p>}
            {pourcentage < 30 && <p className="text-center text-red-500 font-bold">Recommence !</p>}

            <p className="text-center mt-4 font-semibold">
            Score final : {score}/{results.length}
            </p>

            <p className="text-center font-semibold">
            Pourcentage : {Math.round(pourcentage)}%
            </p>
            
            <button
                onClick={restartQuiz}
                style={{ backgroundColor: '#10b981' }}
                className="mt-6 w-full px-4 py-3 text-white font-bold rounded-lg hover:opacity-90 transition-opacity"
            >
                Relancer le quiz
            </button>
        </div>

    );
}