export default interface Question {
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
