import Layout from '@/components/layout/Layout';
import {Category} from '../type/categories.type';

const Categories = ({category}:{category: Category}) => {

    console.log("category", category);
    

    return ( 
        <>
        <Layout>
        <div>
            <h1>Category Page</h1>
            <h3>{category.title}</h3>
            <p>{category.description}</p>
            {category.products.map((product) => (
                <div key={product.id}>
                    <p>{product.img}</p>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p>{product.price}</p>
                </div>
            ))}
            <button>Mettre au Panier</button>
        </div>
        </Layout>
        </> 
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