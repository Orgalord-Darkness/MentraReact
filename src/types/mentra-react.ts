export interface Question {
    id?: number, 
    // type: string, 
    // difficulty: string, 
    // category: string, 
    // question: string, 
    // correct_answer: string,
    type: string; 
    difficulty: string; 
    category: string; 
    question: string; 
    correct_answer: string; 
    incorrect_answers: string[];
}

export interface AnswersListProps {
    incorrectAnswers: string[]; 
    goodAnswer: string; 
    setSelectedAnswer: (answer: string) => void;
    setCompteur: (value: number) => void; 
    currentQuestion: number;
    setCurrentQuestion: (value: number) => void; 
    max: number;
    setStart: (value: boolean) => void; 
    score: number;
    chrono: number;
    clearTimer: () => void;
    
}

export interface Category {
    id: number, 
    name: string
}