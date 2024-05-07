import React, {useState} from 'react'
import {useNavigate ,useParams} from "react-router-dom";
import '../styles/updateblog.css'

export default function UpdateBlog() {

    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({title: "",description: "", tag: ""});
    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/blog/update/${id}`, {
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
    const id = useParams().id;
        // console.log(id);

  return (
    <div className="update-blog">
    <div className="update-blog-title">Update your Blog</div>
    
    <form onSubmit={handleSubmit}>
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
            <input type="text" required name="tag" id="tag" value={credentials.tag} onChange={onChange} />
        </div>
        
        <div className="submit-btn">
            <button type="submit">Update</button>
        </div>
    </form>
</div>

  )
}
