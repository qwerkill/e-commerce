import { Orders } from "./type/orders.type";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import TokenService from "@/service/token.service";



const Admin = () => {
    const [orders, setOrders] = useState<Orders[]>([])

    // récupaire le token
    const token = TokenService.getUserFromLocalToken();

    // récupaire les commandes
    const getOrders = async () => {
        const res = await fetch('http://localhost:8000/api/orders', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await res.json();
        setOrders(data);
      }
      


    useEffect(() => {
        getOrders();
    }, [])



    return (
        <div>
            <h1>Admin</h1>
            <ul>
                {orders.map((order) => (
                    <li key={order.id}>
                        <p>{order.id}</p>
                        <p>{order.status}</p>
                    </li>
                ))}
            </ul>
        </div>
    );

}







export default Admin;