import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("https://go-food-mern-app.vercel.app/api/auth/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password })
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const json = await response.json();
            if (json.success) {
                sessionStorage.setItem('userEmail', credentials.email);
                sessionStorage.setItem('token', json.authToken);
                navigate("/");
            } else {
                alert("Enter Valid Credentials");
            }
        } catch (error) {
            console.error("There has been a problem with your fetch operation: ", error);
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };


    return (
        <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', height: '100vh', backgroundSize: 'cover' }}>
            <div>
                <Navbar />
            </div>
            <div className='container'>
                <form className='w-50 m-auto mt-5 border bg-dark border-success rounded' onSubmit={handleSubmit}>
                    <div className="m-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" placeholder='Enter Email Address' />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone.</div>
                    </div>
                    <div className="m-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" value={credentials.password} onChange={onChange} name='password' placeholder='Enter Password' />
                    </div>
                    <button type="submit" className="m-3 btn btn-success">Submit</button>
                    <Link to="/signup" className="m-3 mx-1 btn btn-danger">New User</Link>
                </form>
            </div>
        </div>
    );
}
