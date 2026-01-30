import { useEffect } from "react";
import type { useEffectCheckRoundProps } from "../types/mentra-react";
export default function UseEffectCheckRound({compteur, setCompteur, start, setStart, currentQuestion, setCurrentQuestion, 
    results, setPourcentage, setEnd, setCanFetch, selectedAnswer, setSelectedAnswer, correct_answer, score, setScore, timerRef, 
    chrono}: useEffectCheckRoundProps) 
{     
    useEffect(() => {
    if (!start) return;

        if (compteur === 0) {
        if (timerRef.current) clearTimeout(timerRef.current);
        
        if(selectedAnswer === correct_answer) {
            setScore((prev: number) => prev + 1); 
        }
        
        setSelectedAnswer("");

        if (currentQuestion + 1 < results.length) {
            setCurrentQuestion((prev: number) => prev + 1);
            setCompteur(chrono);
        } else {
            
            if(selectedAnswer === correct_answer) {
            setScore((prev: number) => prev + 1); 
            } 
            
            setPourcentage((score / results.length) * 100);
            setStart(false);
            setEnd(true);
            setCanFetch(false);
        }

        return; 
        }

        timerRef.current = window.setTimeout(() => {

        if(selectedAnswer === correct_answer) {
            setScore((prev: number) => prev + 1); 
        }
        
        setSelectedAnswer("");

        if (currentQuestion + 1 < results.length) {
            setCurrentQuestion((prev: number) => prev + 1);
            setCompteur(chrono);
        } else {
            
            if(selectedAnswer === correct_answer) { 
            setScore((prev: number) => prev + 1); 
            }
            
            setPourcentage((score / results.length) * 100);
            setStart(false);
            setEnd(true);
            setCanFetch(false);
        }
        }, 5000);

       return () => clearTimeout(timerRef.current!);
    }, [start, compteur, currentQuestion]);

}