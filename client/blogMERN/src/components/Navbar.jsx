import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/navbar.css'

export default function Navbar() {

  const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const logout = () => {
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      navigate('/')
  };

    useEffect(() => {
        const token = localStorage.getItem('token');
        // console.log("useeffect is called");
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
        // console.log("isLoggedIn:", isLoggedIn);
    },[]);

    

    return (
      <nav>
      <div className="logo">Blogify</div>
      <div className="items">
          <div><Link to="/allblogs" className='links'>All Blogs</Link></div>
          {isLoggedIn && (
              <>
                  <div><Link to="/myblogs" className='links'>My Blog</Link></div>
                  <div><Link to="/createblog" className='links'>Create A Blog</Link></div>
              </>
          )}
      </div>
      <div className="userbtns">
          {!isLoggedIn ? (
              <>
                  <button><Link to="/login" className='btns'>Login</Link></button>
                  <button><Link to="/signup" className='btns'>Signup</Link></button>
              </>
          ) : (
              <button onClick={logout} className='btns'>Logout</button>
          )}
      </div>
  </nav>
    );
}
