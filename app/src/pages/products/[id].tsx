import Layout from '@/components/layout/Layout';
import {Product} from '../type/products.type';

const Products = ({product}:{product: Product}) => {

    console.log("product", product);
    

    return (  
        <>
        <Layout>
        <div>
            <h1>Product Page</h1>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <p>{product.category_id.title}</p>
            <p>{product.category_id.description}</p>
            <button>Mettre au Panier</button>
        </div>
        </Layout>
        </>
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