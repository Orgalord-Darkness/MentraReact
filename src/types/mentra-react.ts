export interface Question {
    id: number,
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
    clearTimer: () => void;
    setValidate: (value: boolean) => void;     
    
}

export interface Category {
    id: number, 
    name: string
}

export interface FormSelectQuizProps {  
    categories: Category[];
    difficulty: string;
    setDifficulty: (difficulty: string) => void;
    category: number;
    setCategory: (category: number) => void;
    nbQuestions: number;
    setNbQuestions: (nbQuestions: number) => void;
    setStart: (start: boolean) => void;
    setEnd: (end: boolean) => void;
    setCanFetch: (canFetch: boolean) => void;
    timerRef: React.RefObject<number | null>;
    setScore: (score: number) => void;
    setCurrentQuestion: (currentQuestion: number) => void;
    setSelectedAnswer: (selectedAnswer: string) => void;
    chrono: number;
    setCompteur: (compteur: number) => void;
}

export interface useEffectCheckRoundProps {
  start: boolean;
  setStart: (value: boolean) => void;
  end: boolean;
  setEnd: (value: boolean) => void;
  compteur: number;
  setCompteur: (value: number) => void;
  chrono: number;
  selectedAnswer: string;
  setSelectedAnswer: (value: string) => void;
  correct_answer: string;
  score: number;
  setScore: (value: number | ((prev: number) => number)) => void;
  currentQuestion: number;
  setCurrentQuestion: (value: number | ((prev: number) => number)) => void;
  results: Question[];
  setPourcentage: (value: number) => void;
  setCanFetch: (value: boolean) => void;
  timerRef: React.RefObject<number | null>;
  validate: boolean;    
  setValidate: (value: boolean) => void;    
}

export interface FinalMessageProps {
    pourcentage: number;
    score: number;
    results: Question[];
}