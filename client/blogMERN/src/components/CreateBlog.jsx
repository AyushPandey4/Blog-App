import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import '../styles/createblog.css'

export default function CreateBlog() {

    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({title: "",description: "", tag: ""});
    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/blog/createblog", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authToken': localStorage.getItem('token')
            },
            body: JSON.stringify({title: credentials.title, description: credentials.description, tag: credentials.tag})
        });
        const json = await response.json()
        console.log(json);
        if (json.success){
            navigate("/myblogs");
        }
        else{
            alert("some error occured!");
        }

    }




  return (
    <div className="create-blog-form">
        <div className="head">Create A Blog</div>
    <form onSubmit={handleSubmit} className='createblogform'>
        <div className="form-items">
            <label htmlFor="title">Title</label>
            <input type="text" required name="title" id="title" value={credentials.title} onChange={onChange} />
        </div>
        <div className="form-items">
            <label htmlFor="description">Description</label>
            <textarea name="description" required id="description" value={credentials.description} onChange={onChange} cols="30" rows="10"></textarea>
        </div>
        <div className="form-items">
            <label htmlFor="tag">Tags</label>
            <input type="text" name="tag" id="tag" value={credentials.tag} onChange={onChange} />
        </div>
        
        <div className="submit-btn">
            <button type="submit">Post</button>
        </div>
    </form>
</div>

  )
}
