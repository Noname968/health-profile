import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import profilecontext from '../context/profiles/Profilecontext'

function Navbar() {
    const location = useLocation();
    const history = useNavigate();
    const context = useContext(profilecontext)
    const { getloggedin, loggedIn } = context;
    // const host = "http://localhost:5000";
    const host = "https://health-profile.netlify.app";

    const handlelogout = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`${host}/api/auth/logout`, { withCredentials: true });
            const data = await response.data;
            toast.success("Logout Successfull, Redirecting...", { autoClose: 1000, theme: "colored" });
            setTimeout(async () => {
                await getloggedin();
                history("/login");
            }, 1300);
        } catch (error) {
            toast.error(error.response.data.errorMessage, { theme: "colored", });
        }
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/profile">H_PROFILE</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {loggedIn === true && (<>
                                <li className="nav-item">
                                    <Link className={`nav-link ${location.pathname === '/profile' ? 'active' : ""}`} aria-current="page" to="/profile">Profiles</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={`nav-link ${location.pathname === '/addprofile' ? 'active' : ""}`} aria-current="page" to="/addprofile">Add a Profile</Link>
                                </li>
                            </>)}
                        </ul>
                        <button class="btn btn-outline-success" type="submit" onClick={handlelogout}>Logout</button>
                    </div>
                </div>
            </nav>
            <ToastContainer />
        </>
    )
}

export default Navbar
