import Layout from "@/components/layout/Layout";
import { useEffect, useState } from "react";

import { Orders } from "./type/orders.type";

const Panier = () => {
    const [order, setOrder] = useState<Orders>({} as Orders)

    console.log(order)

    const getOrders = async () => {
        const response = await fetch("http://localhost:8000/api/orders/4");
        const data = await response.json();
        setOrder(data);
    };

    const orderItems = order.orderItems;

    
    
    useEffect(() => {
        getOrders();
    }, []);
    
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
