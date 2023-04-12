import Layout from '@/components/layout/Layout';
import TokenService from '@/service/token.service';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {Product} from '../type/products.type';
import { User } from '../type/user.type';
import { userProfil } from '../type/userProfil.type';

const Products = ({product}:{product: Product}) => {
    const [userProfil, setUserProfil] = useState<userProfil>();
    const [user, setUser] = useState<User>();
    const router = useRouter();

    console.log("product", product);

    useEffect(() => {
        getProfile();
    }, [])
    
    // console.log("userProfil", userProfil);
    // console.log("user", user);
    



    // post order au user connecté 
    const PostOrder = async () => {
        const token = TokenService.getTokenFromLocalStorage();
        const res = await fetch('http://localhost:8000/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                user_id: userProfil?.sub
            })
        })
        const data = await res.json();
        console.log(data);
    }

    const PostOrderItem = async (id:number) => {
        const token = TokenService.getTokenFromLocalStorage();
        const res = await fetch('http://localhost:8000/api/orders_item', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                order_id: user?.orders[0].id,
                product_id: id,
                quantity: 1
            })
        })
        const data = await res.json();
        console.log(data);
    }

    
    const addToCart = async (id:number) => {
        console.log("id", id);
        
        const token = TokenService.getTokenFromLocalStorage();
        if(!token){
            router.push('/connection/signin');
        } else{
            if(user?.orders.length === 0){
                PostOrder();
            } else {
                PostOrderItem(id);
            }
        }
        
    }

    
    const getProfile = async () => {
        const token = TokenService.getTokenFromLocalStorage();
        const res = await fetch('http://localhost:8000/api/auth/profile', {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        const data = await res.json();
        console.log(data);
        setUserProfil(data);
                }

                useEffect(() => {
                    getUser();
                }, [userProfil])
   
        const getUser = async () => {
                    if(userProfil ) {
                        const token = TokenService.getTokenFromLocalStorage();
                        const res = await fetch(`http://localhost:8000/api/users/${userProfil?.sub}`, {
                            method: 'GET',
                            headers:{
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            },
                        })
                        const data = await res.json();
                        setUser(data);
                    } else {
                        return console.log();
                        
                    }
                }
            



    

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
            <button onClick={()=>addToCart(product.id)}>Mettre au Panier</button>
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