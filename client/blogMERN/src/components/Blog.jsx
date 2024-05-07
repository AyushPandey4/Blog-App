import React, { useState, useEffect } from 'react';
import {useParams} from "react-router-dom";
import '../styles/blog.css'
import { Link } from 'react-router-dom';
const Blog = () => {
    const [blog, setBlog] = useState(null);

        const id = useParams().id;
        // console.log(id);
        useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await fetch(`http://localhost:5000/blog/blog/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch blog');
                }
                const data = await response.json();
                setBlog(data);
            } catch (error) {
                console.error(error.message);
            }
        };
        fetchBlog();
    }, []);
    if (!blog) {
        return <div>Loading...</div>;
    }

    return (
        <div className='container'>
            {/* <div>
                Blog:
            </div> */}
            <div className="blog">
                <div className="username"><Link className='usernamelink' to={`/account/${blog.users._id}`}>{blog.users.username}</Link></div>
                <div className="title">{blog.title}</div>
                <div className="descriptionblog">{blog.description}</div>
                <div className="tag">{blog.tag}</div>
                <div className="date">{blog.date.slice(0,10)} {blog.date.slice(11,19)}</div>
            </div>
        </div>
    );
};

export default Blog;
