import { Product } from "@/pages/type/products.type";
import { useEffect, useState } from "react";


const Products = ({product}:{product: Product}) => {
    const [products, setProducts] = useState<Product>({} as Product)    

    


    

    const UpdateProduct = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const response = await fetch(`http://localhost:8000/api/products/${product.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(products)
        });
        const data = await response.json();
        console.log(data);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setProducts({...products, [name]: name === "price" ? parseInt(value): value})
    }
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        UpdateProduct(e);
    }


    return (  
        <div>
            <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" onChange={handleChange}  value={product.name || ""}/>
                <label htmlFor="description">Description</label>
                <input type="text" name="description" id="description" onChange={handleChange} value={product.description || ""}/>
                <label htmlFor="price">Price</label>
                <input type="text" name="price" id="price" onChange={handleChange} value={product.price || ""}/>
                <label htmlFor="img">Image</label>
                <input type="text" name="img" id="img" onChange={handleChange} value={product.img || ""}/>
                <button type="submit">Créer</button>
            </form>
        </div>
    );
}

export async function getStaticProps({params}:{params: {id: string}}){
    const product = await fetch(`http://localhost:8000/api/products/${params.id}`)
    const productJson = await product.json();

    return{
        props: {
            product: productJson
        },
        revalidate: 10,
    }
}

export async function getStaticPaths(){
    const products = await fetch('http://localhost:8000/api/products')
    const productsJson = await products.json();

    const paths = productsJson.map((product: Product) => {
        return {
            params: {id: product.id.toString()}
        }
    })

    return{
        paths,
        fallback: false,
    }
}





 
export default Products;