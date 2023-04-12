import Layout from "@/components/layout/Layout";
import TokenService from "@/service/token.service";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Orders } from "./type/orders.type";
import { User } from "./type/user.type";
import { userProfil } from "./type/userProfil.type";

const Panier = () => {
    const [order, setOrder] = useState<Orders>({} as Orders)
    const [userProfil, setUserProfil] = useState<userProfil>();
    const [user, setUser] = useState<User>();
    const router = useRouter();
    
    useEffect(() => {
        getProfile();
        const token = TokenService.getTokenFromLocalStorage();
        if(!token){
            router.push('/connection/signin');
        }
    }, []);
    


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

                console.log(user);
                
  
    

    console.log(order)
    useEffect(() => {
        getOrders();
    }, [user])

    const getOrders = async () => {
        const token = TokenService.getTokenFromLocalStorage();
        const res = await fetch(`http://localhost:8000/api/orders/${user?.orders[0].id}`, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        const data = await res.json();
        setOrder(data);
    }


    

    const orderItems = order.orderItems;

    
    
    
    const handleDelete = async (id: number) => {
        await fetch(`http://localhost:8000/api/orders_item/${id}`, {
            method: 'DELETE'
        });
        getOrders();
    }
    
    


    const handleIncremented = async (id: number) => {
        const orderItem = orderItems.find((orderItem) => orderItem.id === id);
        
        if (orderItem) {
            await fetch(`http://localhost:8000/api/orders_item/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    quantity: orderItem.quantity + 1
                })
            });
                getOrders();
        }
    }           


    const handleDecremented = async (id: number) => {
        const orderItem = orderItems.find((orderItem) => orderItem.id === id);
         
        if (orderItem) {
            await fetch(`http://localhost:8000/api/orders_item/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    quantity: orderItem.quantity - 1
                })
            });
                getOrders();
        }
    }

    return ( 
        <>
        <Layout>
        <div>
            <h1>Panier</h1>
                    {orderItems && orderItems.map((orderItem) => (
                        <div key={orderItem.id}>
                            <h3>{orderItem.id}</h3>
                            <h3>{orderItem.product_id.name} X {orderItem.quantity}</h3>
                            <h3>{orderItem.product_id.description}</h3>
                            <h3>{orderItem.product_id.price}€</h3>    
                            <h3>{orderItem.product_id.img}#</h3>    
                            <button onClick={()=>handleIncremented(orderItem.id)}>+</button> <button onClick={()=>handleDecremented(orderItem.id)}>-</button>
                            <button onClick={() => handleDelete(orderItem.id)}>Supprimer</button>
                            </div>
                    ))}
                    <h2>Total: {order.amount}€</h2>
        </div>
        </Layout>
        </>
     );
}

export default Panier;
