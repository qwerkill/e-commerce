import Link from "next/link";
import { Category } from "../type/categories.type";



const Categories = ({categories}:{categories: Category[]}) => {


    const handleDelete = async (id: number) => {
        const res = await fetch(`http://localhost:8000/api/categories/${id}`, {
            method: 'DELETE'
        })
        const data = await res.json();
        console.log(data);
    }


    return (  
        <div className="startPage">
            <div>
            <h1>Liste Categories</h1>
            <Link href='/admin/createcategory'><button>Créer une category</button></Link>
            </div>
            {categories.map((category) => (
                <div key={category.id}>
                    <h3>{category.title}</h3>
                    <p>{category.description}</p>
                    <Link href={`/admin/categories/${category.id}`}><button>Modifier la Catégorie</button></Link>
                    <button onClick={()=>handleDelete(category.id)}>Supprimer la catégorie</button>
                </div>
            ))}
        </div>
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