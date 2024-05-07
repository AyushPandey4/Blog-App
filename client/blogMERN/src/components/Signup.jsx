import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import '../styles/signup.css'

export default function Signup() {
    
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({name: "",username: "",bio: "", location: "", dob: "",email: "", password: ""});
    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/user/signup", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: credentials.name,username: credentials.username,location: credentials.location,bio: credentials.bio,dob: credentials.dob, email: credentials.email, password: credentials.password})
        });
        const json = await response.json()
        console.log(json);
        if (json){
            // Save the auth token and redirect
            // localStorage.setItem('token', json.authtoken); 
            // history.push("/");
            navigate("/login");


        }
        else{
            alert("Invalid credentials");
        }

    }




  return (
    <div className='container'>
        <form onSubmit={handleSubmit}>

            <div className="formitems">
                <label htmlFor="name">Name</label>
                <input type="text" required name="name" id="name" value={credentials.name} onChange={onChange} />
            </div>
            <div className="formitems">
                <label htmlFor="username">Username</label>
                <input type="text" required name="username" id="username" value={credentials.username} onChange={onChange} />
            </div>
            <div className="formitems">
                <label htmlFor="email">E-mail</label>
                <input type="email" required name="email" id="email" value={credentials.email} onChange={onChange} />
            </div>
            <div className="formitems">
                <label htmlFor="password">Password</label>
                <input type="password" required name="password" id="password" value={credentials.password} onChange={onChange} />
            </div>
            <div className="formitems">
                <label htmlFor="bio">Bio</label>
                <input type="text" required name="bio" id="bio" value={credentials.bio} onChange={onChange} />
            </div>
            <div className="formitems">
                <label htmlFor="location">Location</label>
                <input type="text" required name="location" id="location" value={credentials.location} onChange={onChange} />
            </div>
            <div className="formitems">
                <label htmlFor="dob">Date Of Birth</label>
                <input type="text" required name="dob" id="dob" value={credentials.dob} onChange={onChange} />
            </div>
           
            <div className="submitbtn">
                <button type="submit">Signup</button>
            </div>
        </form>
    </div>
  )
}
