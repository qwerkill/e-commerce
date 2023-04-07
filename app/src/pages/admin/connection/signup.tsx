import { User } from '@/pages/type/user.type';
import { useRouter } from 'next/router';
import  { useState } from 'react';
import Cookies from 'js-cookie';


const Signup = () => {
    const [user, setUser] = useState<User[]>([])
    const router = useRouter();


    const createUser = async () => {
        const res = await fetch('http://localhost:8000/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user               
                )
        })
        const data = await res.json();
        localStorage.setItem('token', data.token);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setUser({...user, [name]: value})
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createUser();
        router.push('/admin');
    }

    console.log("user", user);


    return ( 
        <div>
            <h1>Signup</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="text" name="email" id="email" onChange={handleChange} />
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" onChange={handleChange} />
                <label htmlFor="password">Password</label>
                <input type="text" name="password" id="password" onChange={handleChange}/>
                <label htmlFor="adress">Adress</label>
                <input type="text" name="adress" id="adress" onChange={handleChange}/>
                {/* <label htmlFor="city">Admin</label>
                <input type="text" name="is_admin" id="is_admin" onChange={handleChange}/> */}
                <button type="submit">Signup</button>
            </form>
        </div>
     );
}
 
export default Signup;