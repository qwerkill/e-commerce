import  { useState } from 'react';
import { User } from '../type/user.type';

const Signin = () => {
    const [user, setUser] = useState<User[]>([])


    const createUser = async () => {
        const res = await fetch('http://localhost:8000/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                is_admin: false,
            })
        })
        const data = await res.json();
        console.log(data);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setUser({...user, [name]: value})
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createUser();
    }



    return ( 
        <div>
            <h1>Signin</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="text" name="email" id="email" onChange={handleChange} />
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" onChange={handleChange} />
                <label htmlFor="password">Password</label>
                <input type="text" name="password" id="password" onChange={handleChange}/>
                <button type="submit">Signin</button>
            </form>
        </div>
     );
}
 
export default Signin;