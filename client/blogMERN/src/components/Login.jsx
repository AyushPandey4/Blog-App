import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import '../styles/signup.css'

export default function Login() {
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({email: "", password: ""});
    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/user/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json()
        // console.log(json);
        if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.token); 
            // history.push("/");
            navigate("/");


        }
        else{
            alert("Invalid credentials");
        }

    }

  return (
    <div>
        <form onSubmit={handleSubmit} className='loginform'>
            <div className="formitems">
                <label htmlFor="email">E-mail</label>
                <input type="email" required name="email" id="email" value={credentials.email} onChange={onChange} />
            </div>
            <div className="formitems">
                <label htmlFor="password">Password</label>
                <input type="password" required name="password" id="password" value={credentials.password} onChange={onChange} />
            </div>
            <div className="submitbtn">
                <button type="submit">Login</button>
            </div>
        </form>
    </div>
  )
}
