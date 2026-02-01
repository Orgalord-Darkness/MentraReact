import { useEffect, useState } from "react";
import type { Question } from "../types/mentra-react";

export default function urlFetch(nbQuestions:number, difficulty:string, category: number, canFetch:boolean) {
    const [results, setResults] = useState<Question[]>([]); 
    const [errors, setErrors] = useState<string[]|null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    
    useEffect(()=> {
        if(!canFetch) { 
            return;
        }
        if(!nbQuestions || !difficulty || !category){
            setErrors(['Paramètres manquants pour le fetch de l\'API']);
            return;
        }
        setLoading(true); 
        const url = `https://opentdb.com/api.php?amount=${nbQuestions}&category=${category}&difficulty=${difficulty}`;
        fetch(url)
        .then(res => {
            if(!res.ok) {
                throw new Error(`Erreur lors du fetch de l'API : ${res.status} ${res.statusText}`);
            }
            return res.json()
        })
        .then(data => {
            if(data.response_code !== 0) {
                throw new Error(`Erreur lors du fetch de l'API : Nombre de réponses trouvées : ${data.response_code}`);
            }   
            setResults(
                data.results.map((q: Question, index: number) => ({
                    ...q,
                    id: index + 1
                }))
            );

        }).catch((e) => {
            setErrors([`Erreur lors du fetch de l'API : ${e}`]);
        }).finally(() => {
            setLoading(false);
        });
    }, [canFetch]);
    return {results, errors, loading};
}