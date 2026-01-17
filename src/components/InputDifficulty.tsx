export default function InputDifficulty(){
    return(
        <>
        <form>
            <label>Difficulté : </label>
            <select className = 'border px-2 py-2'>
                <option value="easy">Facile</option>
                <option value="medium">Moyen</option>
                <option value="hard">Difficile</option>
            </select>
        </form>
        </>
    )
}