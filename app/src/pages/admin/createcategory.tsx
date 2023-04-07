import { Category } from "@/pages/type/categories.type";
import { useState } from "react";

const CreateCategory = () => {
    const [categories, setCategories] = useState<Category[]>([])

   const postCategory = async () =>{
    const response = await fetch('http://localhost:8000/api/categories', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(categories)
    });
    const data = await response.json();
    console.log(data);   
}

   
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setCategories({...categories, [name]: value})
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        postCategory();
    }


    return (  
        <div>
            <h1>Create Category</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label>
                <input type="text" name="title" id="title" onChange={handleChange} />
                <label htmlFor="description">Description</label>
                <input type="text" name="description" id="description" onChange={handleChange}/>
                <button type="submit">Créer</button>
            </form>
        </div>
    );
}
 
export default CreateCategory;