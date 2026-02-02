import type {FormSelectQuizProps } from "../types/mentra-react";

export default function FormSelectQuiz({categories,difficulty, setDifficulty, category,setCategory, nbQuestions, setNbQuestions,setStart, 
setEnd,setCanFetch,timerRef,setScore,setCurrentQuestion,setSelectedAnswer,chrono,setCompteur
}: FormSelectQuizProps) {

return (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      if (timerRef.current) clearTimeout(timerRef.current);
      setStart(true);
      setEnd(false);
      setCanFetch(true);
      setScore(0);
      setCurrentQuestion(0);
      setSelectedAnswer("");
      setCompteur(chrono);
    }}
    className="flex flex-col gap-4 mt-10 max-w-md mx-auto p-6 bg-white shadow-xl rounded-xl border border-purple-300"
  >
    <label className="font-semibold text-purple-700">Difficulté :</label>
    <select
      value={difficulty}
      onChange={(e) => setDifficulty(e.target.value)}
      className="border px-3 py-2 rounded bg-purple-50"
    >
      <option value="easy">Facile</option>
      <option value="medium">Moyen</option>
      <option value="hard">Difficile</option>
    </select>

    <label className="font-semibold text-purple-700">Catégorie :</label>
    <select
      value={category}
      onChange={(e) => setCategory(Number(e.target.value))}
      className="border px-3 py-2 rounded bg-purple-50"
    >
      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>

    <label className="font-semibold text-purple-700">Nombre de questions :</label>
    <input
      type="number"
      value={nbQuestions}
      onChange={(e) => setNbQuestions(Number(e.target.value))}
      className="border px-3 py-2 rounded bg-purple-50"
    />

    <input
      type="submit"
      value="Lancer le quiz"
      className="px-3 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
    />
  </form>

); 
}