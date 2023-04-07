import { User } from "../type/user.type";
import { useState } from "react";

const Signup = () => {
    const [user, setUser] = useState<User[]>([])

    const connectUser = async () => {
        const res = await fetch('http://localhost:8000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user
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
        connectUser();
    }




    return ( 
        <div>
            <h1>Signup</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">UserName</label>
                <input type="text" name="username" id="username" onChange={handleChange}/>
                <label htmlFor="email">Password</label>
                <input type="text" name="password" id="password" onChange={handleChange}/>
            </form>
        </div>
        
     );
}
 
export default Signup;