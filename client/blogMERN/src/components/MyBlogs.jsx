import React,{useContext, useEffect} from 'react'
import BlogContext from '../context/BlogContext'
import {Link, useNavigate} from 'react-router-dom'
import '../styles/myblogs.css'

export default function MyBlogs() {

  const navigate = useNavigate();
    const context = useContext(BlogContext);
    const {myblogs, myblogsFun} = context;

    useEffect(() => {
        myblogsFun()
        
    },[myblogs])

    const deleteBlog = async (id) => {
      try {
        const response = await fetch(`http://localhost:5000/blog/delete/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authToken': localStorage.getItem('token')
            },
        });

        const json = await response.json();
        // console.log(json);
        if (json.success) {
            navigate("/myblogs");
        } else {
            alert("Some error occurred!");
        }
    } catch (error) {
        console.error("Error deleting blog:", error);
    }
    }

  return (
    <div className='blogs-container'>
         <div className='myblogs'>My Blogs</div>
        {myblogs.map((blogs, index) => (
                <div className="blog" key={index}> 
                    {/* <div className="username"><Link className='usernamelink' to={`/account/${blogs.users._id}`}>{blogs.users.username}</Link></div>  */}
                    <div className="title"><Link className='titlelink' to={`/blog/${blogs._id}`}>{blogs.title}</Link></div> 
                    <div className="description">{blogs.description}</div> 
                    <div className="tag">{blogs.tag}</div>
                    <div className="date">{blogs.date.slice(0,10)} {blogs.date.slice(11,19)}</div>
                    <button><Link className='updatelink' to={`/update/${blogs._id}`}>Update</Link></button>
                    <button onClick={() => deleteBlog(blogs._id)}>Delete</button>
                </div>
            ))}

    </div>
  )
}
