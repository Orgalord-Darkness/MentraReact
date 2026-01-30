import type {FormSelectQuizProps } from "../types/mentra-react";

export default function FormSelectQuiz({categories,difficulty, setDifficulty, category,setCategory, nbQuestions, setNbQuestions,setStart, 
  setEnd,setCanFetch,timerRef,setScore,setCurrentQuestion,setSelectedAnswer,chrono,setCompteur
}: FormSelectQuizProps) {

  return (
    <form onSubmit={(e) => { 
      e.preventDefault();
      setStart(true); 
      setEnd(false);
      setCanFetch(true);
        if (timerRef.current) 
        clearTimeout(timerRef.current);
        setScore(0); 
        setCurrentQuestion(0); 
        setSelectedAnswer(""); 
        setCompteur(chrono); 
      }} 
      className='flex flex-col gap-4 mt-8'>
      <label>Difficulté : </label>
      <select
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
        className='border px-2 py-2'
      >
        <option value="easy">Facile</option>
        <option value="medium">Moyen</option>
        <option value="hard">Difficile</option>
      </select>

      <label>Catégorie : </label>
      <select
        value={category}
        onChange={(e) => setCategory(Number(e.target.value))}
        className='border px-2 py-2'
      >
        {categories.map((category) => (
          <option key={category.id} value={category.id}>{category.name}</option>
        ))}
      </select>

      <label>Nombre de questions : </label>
      <input
        type="number"
        value={nbQuestions}
        onChange={(e) => setNbQuestions(Number(e.target.value))}
        className="border"
      />

      <input
        type="submit"
        value="Lancer le quiz"
        className="border px-2 py-2 bg-blue-500 text-white"
      />
    </form>
); 
}