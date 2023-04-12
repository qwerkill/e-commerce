import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { Category } from "./type/categories.type";
import { Product } from "./type/products.type";


interface HomepageProps {
    products: Product[];
    categories: Category[];
}


export default function Home ({products, categories}: HomepageProps) { 
  
  
  const lastProducts = products.slice(products.length - 3);
  const lastCategory = categories.slice(categories.length - 3);
  return (
    <>
    <Layout>
      <div className="startPage">
            <h2>Les derniers Produits du catalogue</h2>
            {lastProducts.map((product) => (
                <div key={product.id}>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p>{product.price}</p>
                    
                </div>
            ))}
            <Link href='/products'><button>Voir tous les produits</button></Link>
            <h2>Les dernières catégories du catalogue</h2>
            {lastCategory.map((category) => (
                <div key={category.id}>
                    <h3>{category.title}</h3>
                    <p>{category.description}</p>
                </div>
            ))}
            <Link href='/categories'><button>Voir tous les categories</button></Link>
        </div>
    </Layout>
    </>
  )
}


export async function getStaticProps(){
  const product = await fetch('http://localhost:8000/api/products')    
  const products = await product.json();

  const categoriesJson = await fetch('http://localhost:8000/api/categories')    
  const categories = await categoriesJson.json();
  
  return{
      props: {
          products, 
          categories
      },     
      revalidate: 10,
  }

  
}