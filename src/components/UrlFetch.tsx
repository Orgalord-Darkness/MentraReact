import { useEffect, useState } from "react";
import type { Question } from "../types/mentra-react";

export default function urlFetch(nbQuestions:number, difficulty:string, category: number) {
    const url = `https://opentdb.com/api.php?amount=${nbQuestions}&category=${category}&difficulty=${difficulty}`; 
    const [results, setResults] = useState<Question[]>([]); 
    useEffect(()=> {
        fetch(url)
        .then(res => res.json())
        .then(data => {
            setResults(
            data.results.map((q: Question, index: number) => ({
                ...q,
                id: index + 1
            }))
            );
    
        })
    }, [])

    return results; 
}