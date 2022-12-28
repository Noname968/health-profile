import React, { useState, useContext } from 'react'
import Header from './Header'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import profilecontext from '../context/profiles/Profilecontext'
axios.defaults.withCredentials = true;

function Register() {
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [password2, setpassword2] = useState("");
    const history = useNavigate();
    const context = useContext(profilecontext)
    const { getloggedin } = context;
    // const host = "http://localhost:5000";
    const host = "https://health-profile-mern.onrender.com/";

    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${host}/api/auth/`,
                {
                    "name": name,
                    "email": email,
                    "password": password,
                    "passwordverify": password2
                }, { withCredentials: true })
            const data = await response.data;
            toast.success("Sign Up Successfull", { autoClose: 1000, theme: "colored" });
            setTimeout(async () => {
                await getloggedin();
                history("/profile")
            }, 1300);
        } catch (error) {
            // console.log(error);
            toast.error(error.response.data.errorMessage, { theme: "colored", });
        }
    }

    return (
        <>
            <section className="vh-100" style={{ margin: "0" }}>
                <div className="container h-75">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <Header />
                        <div className=" col-lg-12 col-xl-11" style={{ borderRadius: "23px" }}>
                            <div className="card-body p-md-7">
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                            className="img-fluid" alt="Sample" />
                                    </div>
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                                        <form className="mx-1 mx-md-4" onSubmit={handlesubmit}>
                                            <div className="d-flex flex-row align-items-center mb-3">
                                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="text" id="form3Example1c" className="form-control" value={name} onChange={(e) => { setname(e.target.value) }} />
                                                    <label className="form-label" htmlFor="form3Example1c">Your Name</label>
                                                </div>
                                            </div>
                                            <div className="d-flex flex-row align-items-center mb-3">
                                                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="email" id="form3Example3c" className="form-control" value={email} onChange={(e) => { setemail(e.target.value) }} required />
                                                    <label className="form-label" htmlFor="form3Example3c">Your Email</label>
                                                </div>
                                            </div>
                                            <div className="d-flex flex-row align-items-center mb-3">
                                                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="password" id="form3Example4c" className="form-control" value={password} onChange={(e) => { setpassword(e.target.value) }} required minLength={8} />
                                                    <label className="form-label" htmlFor="form3Example4c">Password</label>
                                                </div>
                                            </div>
                                            <div className="d-flex flex-row align-items-center mb-3">
                                                <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="password" id="form3Example4cd" className="form-control" value={password2} onChange={(e) => { setpassword2(e.target.value) }} required minLength={8} />
                                                    <label className="form-label" htmlFor="form3Example4cd">Repeat your password</label>
                                                </div>
                                            </div>
                                            <div className="d-flex flex-row align-items-center mb-3">
                                                <p className="grey-text text-darken-1 mx-3">
                                                    Already have an account? <Link to="/login" className='link-danger'>Log in</Link>
                                                </p>
                                            </div>
                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <button type="submit" className="btn btn-primary btn-lg">Register</button>
                                            </div>
                                        </form>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer />
        </>
    )
}

export default Register
