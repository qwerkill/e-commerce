import { Orders } from '@/pages/type/orders.type';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import header from '../../styles/Header.module.css'

const Header = () => {
    const [order, setOrder] = useState<Orders>({} as Orders)

    useEffect(() => {
        getOrders();
    }, []);

    const getOrders = async () => {
        const response = await fetch("http://localhost:8000/api/orders/5");
        const data = await response.json();
        setOrder(data);
    };

    



    return (  
        <header className={header.header}>
            <div className={header.centre}>
        <Link href='/' className={header.link}>
            <img className={header.image} src="https://www.dynamicmarketing.eu/wp-content/uploads/2018/06/ecommerce.logo_.png" alt="" />
        </Link>    
            <ul className={header.list}>
        <Link href='/products' className={header.link}>
                    <li>Produits</li>
        </Link>
        <Link href='/categories' className={header.link}>
                <li>Catégories</li>
        </Link>
            </ul>
        <Link href='/panier' className={header.link}>
        {order.orderItems && <span>{order.orderItems.length}</span>}    <img className={header.icon} src="https://cdn-icons-png.flaticon.com/512/118/118089.png" alt="" />
        </Link>
            </div>
            

        </header>
    );
}
 
export default Header;