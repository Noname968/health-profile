import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import Profiles from './pages/Profiles'
import Addprofile from './pages/Addprofile'
import profilecontext from './context/profiles/Profilecontext'


function Router() {
    const context = useContext(profilecontext)
    const { loggedIn } = context;
    return (
        <Routes>
            {loggedIn === false && (<>
                <Route exact path="/" element={<Register />} />
                <Route exact path="/login" element={<Login />} />
            </>)}
            {loggedIn === true && (<>
                <Route exact path="/profile" element={<Profiles />} />
                <Route exact path="/addprofile" element={<Addprofile />} />
            </>)}
        </Routes>
    )
}

export default Router
