import Layout from "../components/layout/Layout";
import Link from "next/link";
import { Product } from "./type/products.type";

  

 
interface HomepageProps {
    products: Product[];
}

const ProductsPage: React.FC<HomepageProps> = ({products}) => {

    console.log("products", products);
    

    return ( 
<>
    <Layout>
        <div className="startPage">
            <h1>Products Page</h1>
            {products.map((product) => (
                <div key={product.id}>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p>{product.price}</p>
                    <p>{product.category_id.title}</p>
                    <p>{product.category_id.description}</p>
                    <Link href={`/products/${product.id}`}><button>Voir le produit</button></Link>
                </div>
            ))}

        </div>
    </Layout>
</>
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