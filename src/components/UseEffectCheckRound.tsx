import { useEffect } from "react";
import type { useEffectCheckRoundProps } from "../types/mentra-react";

export function useCheckRound({
  compteur,
  setCompteur,
  start,
  setStart,
  currentQuestion,
  setCurrentQuestion,
  results,
  setPourcentage,
  setEnd,
  setCanFetch,
  selectedAnswer,
  setSelectedAnswer,
  correct_answer,
  score,
  setScore,
  timerRef,
  chrono,
  validate,
  setValidate,  
}: useEffectCheckRoundProps) {
     useEffect(() => {
        if (!start) {
            return;
        }

        if(!validate) {
            return;
        }

        if(selectedAnswer === correct_answer) {
            console.log("Correct answer selected");
            setScore(prev => prev + 1); 
            setValidate(false); 
        }

        if (compteur === 0) {

            if (timerRef.current){
                clearTimeout(timerRef.current);
            }
            
            setSelectedAnswer("");

            if (currentQuestion + 1 < results.length) {
                setCurrentQuestion(prev => prev + 1);
                setCompteur(chrono);
            } else {                
                setPourcentage((score / results.length) * 100);
                setStart(false);
                setEnd(true);
                setCanFetch(false);
            }

            return; 
        }

        timerRef.current = window.setTimeout(() => {
        
        setSelectedAnswer("");

        if (currentQuestion + 1 < results.length) {
            setCurrentQuestion(prev => prev + 1);
            setCompteur(chrono);
        } else {
            setPourcentage((score / results.length) * 100);
            setStart(false);
            setEnd(true);
            setCanFetch(false);
        }
        }, 5000);

        return () => clearTimeout(timerRef.current!);
    
    }, [start, compteur, currentQuestion]);

}
