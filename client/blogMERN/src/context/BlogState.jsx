import BlogContext from "./BlogContext";

import React, { useState } from 'react'

export default function BlogState(props) {
  
  const host = "http://localhost:5000";
  const [allblogs, setAllblogs] = useState([]);
  const [myblogs, setMyblogs] = useState([]);

  // get all blogs 
  const allblogsFun = async () => {
    try {
      const response = await fetch(`${host}/blog/allblogs`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch blogs');
    }
    const json = await response.json() 
    console.log(json);
    setAllblogs(json)
      
    } catch (error) {
      console.log(error.message);
    }
   
  }


  // get my blogs only 
  const myblogsFun = async () => {
    try {
      const response = await fetch(`${host}/blog/myblogs`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authToken': localStorage.getItem('token')
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch blogs');
    }
    const json = await response.json() 
    setMyblogs(json)

      

    } catch (error) {
      console.log(error.message);
    }
  }









  return (
    <BlogContext.Provider value={{ allblogs, allblogsFun, myblogs, myblogsFun  }}>
    {props.children}
  </BlogContext.Provider>
  )
}
