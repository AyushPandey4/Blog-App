import React, {useState, useEffect} from 'react'
import {useParams} from "react-router-dom";
import '../styles/account.css'

export default function Account() {
    const [account, setAccount] = useState(null);

    const id = useParams().id;
    // console.log(id);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:5000/user/getuser/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch blog');
                }
                const data = await response.json();
                // console.log(data);
                setAccount(data);
            } catch (error) {
                console.error(error.message);
            }
        };
        fetchUser();
    }, []);




  return (
    <div>
        {account ? (
            <>
            <div className="account-details">

            
                <div className="formitems">
                    <label htmlFor="name">Name: </label>
                    <span>{account.name}</span>
                </div>
                <div className="formitems">
                    <label htmlFor="username">Username: </label>
                    <span>{account.username}</span>
                </div>
                <div className="formitems">
                    <label htmlFor="bio">Bio: </label>
                    <span>{account.bio}</span>
                </div>
                <div className="formitems">
                    <label htmlFor="location">Location: </label>
                    <span>{account.location}</span>
                </div>
                <div className="formitems">
                    <label htmlFor="dob">Date Of Birth: </label>
                    <span>{account.dob}</span>
                </div>
                <div className="formitems">
                    <label htmlFor="email">E-mail: </label>
                    <span>{account.email}</span>
                </div>
                </div>
            </>
        ) : (
            <div>Loading...</div>
        )}
    </div>
  )
}
