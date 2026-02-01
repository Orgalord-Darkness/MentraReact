import { useEffect } from "react";
import type { useEffectCheckRoundProps } from "../types/mentra-react";
import { decodeHtml } from "../utils/domParser";

export function CheckRound({compteur, setCompteur, start, setStart, currentQuestion, setCurrentQuestion, results, setEnd, setCanFetch,
  selectedAnswer, setSelectedAnswer, correct_answer, setScore, timerRef, chrono, validate, setValidate,  
}: useEffectCheckRoundProps) {
  
  useEffect(() => {
    if (!start || !validate) {
      return;
    }

    const decodedCorrectAnswer = decodeHtml(correct_answer);
    const decodedSelectedAnswer = decodeHtml(selectedAnswer);

    if (decodedSelectedAnswer === decodedCorrectAnswer) {
        setScore(prev => prev + 1); 
    }

    setValidate(false);
  }, [validate, selectedAnswer, correct_answer, start]);

  useEffect(() => {
    if (!start || validate || compteur !== 0) {
      return;
    }

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setSelectedAnswer("");

    if (currentQuestion + 1 < results.length) {
      setCurrentQuestion(prev => prev + 1);
      setCompteur(chrono);
    } else {
      setStart(false);
      setEnd(true);
      setCanFetch(false);
    }
  }, [compteur, currentQuestion, results.length, start, validate]);

  useEffect(() => {
    if (!start || validate || compteur === 0) {
      return;
    }

    timerRef.current = window.setTimeout(() => {
      setCompteur(prev => prev - 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [start, validate, compteur]);
}