import React, {useContext, useEffect} from 'react'
import BlogContext from '../context/BlogContext'
import {Link} from 'react-router-dom'
import '../styles/allblogs.css'

export default function AllBlogs() {
    
    const context = useContext(BlogContext);
    const {allblogs, allblogsFun} = context;

    useEffect(() => {
        allblogsFun()
        
    },[])
    

  return (
    <div>
        <div className='allblogs'>all blogs</div>
        {allblogs.map((blog, index) => (
                <div className="blog" key={index}> 
                <div className="username"><Link className='usernamelink' to={`/account/${blog.users._id}`}>{blog.users.username}</Link></div> 
                    <div className="title"> <Link className='titlelink' to={`/blog/${blog._id}`}>{blog.title}</Link></div> 
                    <div className="description">{blog.description}</div> 
                    <div className="tag">{blog.tag}</div>
                    <div className="date">{blog.date.slice(0,10)} {blog.date.slice(11,19)}</div>
                </div>
            ))}
    </div>
  )
}
