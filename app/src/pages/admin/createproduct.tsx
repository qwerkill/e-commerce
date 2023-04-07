import { Product } from "@/pages/type/products.type";
import { useState, useEffect } from "react";
import { Category } from "../type/categories.type";

const CreateProduct = ({categories}:{categories:Category[]}) => {
    const [products, setProducts] = useState<Product[]>([])
    const [category, setCategory] = useState<Category[]>([])

    useEffect(() => {
        setCategory(categories)
    }, [categories])

  const postProduct = async () => {
    const res = await fetch('http://localhost:8000/api/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(products)
    })
    const data = await res.json();
    console.log(data);
    }
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setProducts({...products, [name]: name === "price" ? parseInt(value): value});
    }
    
    

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        postProduct();
    }


    return (  
        <div>
            <h1>Create Product</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" onChange={handleChange} />
                <label htmlFor="description">Description</label>
                <input type="text" name="description" id="description" onChange={handleChange}/>
                <label htmlFor="price">Price</label>
                <input type="number" name="price" id="price" onChange={handleChange}/>
                <label htmlFor="img">Image</label>
                <input type="text" name="img" id="img" onChange={handleChange}/>
                <label htmlFor="category">Category</label>   
                <select name="category_id" id="category_id" onChange={handleChange}>
                    {category.map((category) => (
                        <option key={category.id} value={category.id}>{category.title}</option>
                        ))}
                    </select>                              
                <button type="submit">Créer</button>
            </form>
        </div>
    );
}

export async function getStaticProps(){
    const category = await fetch('http://localhost:8000/api/categories')
    const categoryJson = await category.json();

    return {
        props: {
            categories: categoryJson
        }
    }
}

 
export default CreateProduct;