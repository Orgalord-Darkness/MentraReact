import { useEffect, useState } from 'react';
import type {Category} from './../types/mentra-react.tsx'; 

export default function InputCategories() {
    const url ='https://opentdb.com/api_category.php';
    const [categories, setCategories] = useState<Category[]>([]); 
    useEffect(()=> {
        fetch(url)
        .then(res => res.json())
        .then(data => {
            setCategories(data.trivia_categories);
    
        })
    }, [])

    return(
        <>
            <label>Catégorie : </label>
            <select className = 'border px-2 py-2'>
            {categories.map((category) =>( 
                console.log(category), 
                <option value={category.id}>{category.name}</option>
            ),
            )}
            </select>
            
        </>
    )
}