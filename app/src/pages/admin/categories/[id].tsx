import { Category } from "@/pages/type/categories.type";
import { useEffect, useState } from "react";


const Categories = ({category}:{category: Category}) => {
    const [categories, setCategories] = useState<Category>({} as Category)    

   
        

    

    const UpdateCategory = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const response = await fetch(`http://localhost:8000/api/categories/${category.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({categories})
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
        UpdateCategory(e);
    }


    return (  
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label>
                <input type="text" name="title" id="title" onChange={handleChange} value={categories.title || ""}/>
                <label htmlFor="description">Description</label>
                <input type="text" name="description" id="description" onChange={handleChange} value={categories.description || ""}/>
                <button type="submit">Créer</button>
            </form>
        </div>
    );
}

export async function getStaticProps({params}:{params: {id: string}}){
    const category = await fetch(`http://localhost:8000/api/categories/${params.id}`)
    const categoryJson = await category.json();

    return{
        props: {
            category: categoryJson
        },
        revalidate: 10,
    }
}

export async function getStaticPaths(){
    const categories = await fetch('http://localhost:8000/api/categories')
    const categoriesJson = await categories.json();

    const paths = categoriesJson.map((category: Category) => {
        return {
            params: {id: category.id.toString()}
        }
    })

    return{
        paths,
        fallback: false,
    }
}





 
export default Categories;