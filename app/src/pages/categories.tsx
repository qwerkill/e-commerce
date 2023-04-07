import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { Category } from "./type/categories.type";


const Categories = ({categories}:{categories: Category[]}) => {
    return (  
        <>
        <Layout>
        <div className="startPage">
            <h1>Categories Page</h1>
            {categories.map((category) => (
                <div key={category.id}>
                    <h3>{category.title}</h3>
                    <p>{category.description}</p>
                    <Link href={`/categories/${category.id}`}><button>Voir la catégorie</button></Link>
                </div>
            ))}
        </div>
        </Layout>
        </>
    );
}

export async function getStaticProps(){
    const categories = await fetch('http://localhost:8000/api/categories')
    const categoriesJson = await categories.json();
    return{
        props: {
            categories: categoriesJson
        },
        revalidate: 10,
    }
}
 
export default Categories;