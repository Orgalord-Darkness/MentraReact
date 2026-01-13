import {randomInt, randElement} from './../utils/random.tsx'; 

export default function AnswersList(answers: string[], goodAnswer: string){
    answers.push(goodAnswer); 
}