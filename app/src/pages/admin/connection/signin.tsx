import { User } from "@/pages/type/user.type";
import TokenService from "@/service/token.service";
import { useRouter } from "next/router";
import { useState } from "react";

const Signup = () => {
    const [user, setUser] = useState<User[]>([])
    const router = useRouter();

    const connectUser = async () => {
        const res = await fetch('http://localhost:8000/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                
            },
            body: JSON.stringify(user)
        })
        const data = await res.json();
        TokenService.setTokenInLocalStorage(data.token);
        console.log(data);
        
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setUser({...user, [name] : value})
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        connectUser();
        router.push('/admin');
    }




    return ( 
        <div>
            <h1>Signup</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">UserName</label>
                <input type="text" name="username" id="username" onChange={handleChange}/>
                <label htmlFor="email">Password</label>
                <input type="text" name="password" id="password" onChange={handleChange}/>
                <button type="submit">Signup</button>
            </form>
        </div>
        
     );
}
 
export default Signup;