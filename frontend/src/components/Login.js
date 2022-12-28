import React, { useState,useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Header from './Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import profilecontext from '../context/profiles/Profilecontext'
axios.defaults.withCredentials = true;

function Login() {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const history = useNavigate();
    const context = useContext(profilecontext)
    const { getloggedin } = context;

    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/auth/login",
                {
                    "email": email,
                    "password": password,
                }, { withCredentials: true });
            const data = await response.data;
            toast.success("Login Successfull", { autoClose: 1000, theme: "colored" });
            setTimeout(async() => {
                await getloggedin();   
                history("/profile");
            }, 1500);
        } catch (error) {
            toast.error(error.response.data.errorMessage, { theme: "colored", });
        }
    }
    return (
        <>
            <section className="vh-100">
                <div className="container-fluid h-75">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <Header />
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                className="img-fluid" alt="Sample" />
                        </div>
                        <div className="col-md-10 col-lg-6 col-xl-4 offset-xl-1">
                            <form onSubmit={handlesubmit}>
                                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                    <p className="text-center h1 fw-bold mb-4 mx-md-0 mt-4">Sign In</p>
                                </div>
                                <div className="form-outline mb-3">
                                    <input type="email" id="form3Example3" className="form-control " value={email} onChange={(e) => setemail(e.target.value)} />
                                    <label className="form-label" htmlFor="form3Example3">Email address</label>
                                </div>
                                <div className="form-outline mb-2">
                                    <input type="password" id="form3Example4" className="form-control " value={password} onChange={(e) => setpassword(e.target.value)} />
                                    <label className="form-label" htmlFor="form3Example4">Password</label>
                                </div>
                                <div className="text-center text-lg-start mt-2 pt-2">
                                    <p className="small fw mt-0 pt-1 mb-3">Don't have an account? <Link to='/'
                                        className="link-danger">Register</Link></p>
                                    <button type="submit" className="btn btn-primary btn-lg"
                                        style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}>Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer />
        </>
    )
}

export default Login
