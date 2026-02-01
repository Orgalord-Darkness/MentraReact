import type { FinalMessageProps } from "../types/mentra-react";

export function FinalMessage({score, results}: FinalMessageProps) {
    const pourcentage = (score / results.length) * 100;
    return (
        <div className="mt-8">
        <h2 className="text-center font-bold text-xl">Quiz terminé !</h2>
        {pourcentage >= 80 && <p className="text-center text-green-500">Félicitations !</p>}
        {pourcentage < 80 && pourcentage >= 70 && <p className="text-green-700">Bien !</p>} 
        {pourcentage < 70 && pourcentage >= 50 && <p className="text-yellow-500">Pas mal !</p>}
        {pourcentage < 50 && pourcentage >= 30 && <p className="text-orange-500">Peut mieux faire !</p>}
        {pourcentage < 30 && <p className="text-center text-red-500">Recommence !</p>}
        <p className="text-center">Score final : {score}/{results.length}</p>
        <p className="text-center">Pourcentage de bonnes réponses : {Math.round(pourcentage)}%</p>          
        </div>
    );
}