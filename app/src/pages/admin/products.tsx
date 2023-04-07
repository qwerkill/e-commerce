import Link from "next/link";
import { Product } from "../type/products.type";


const ProductsPage = ({products}:{products: Product[]}) => {

    console.log("products", products);
    
    const handleDelete = async (id: number) => {
        const res = await fetch(`http://localhost:8000/api/products/${id}`, {
            method: 'DELETE'
        })
        const data = await res.json();
        console.log(data);
    }

    return ( 
        <div className="startPage">
            <div>
            <h1>Products Page</h1>
            <Link href='/admin/createproduct'><button>Créer un produit</button></Link>
            </div>
            {products.map((product) => (
                <div key={product.id}>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p>{product.price}</p>
                    <p>{product.category_id.title}</p>
                    <p>{product.category_id.description}</p>
                    <Link href={`/admin/products/${product.id}`}><button>Modifier le produit</button></Link>
                    <button onClick={()=>handleDelete(product.id)}>Supprimer le produit</button>
                </div>
            ))}
        </div>
     );
}

export async function getStaticProps(){
    const product = await fetch('http://localhost:8000/api/products')
    const products = await product.json();
    
    return{
        props: {
            products
        },
        revalidate: 10,
    }
}
 
export default ProductsPage;