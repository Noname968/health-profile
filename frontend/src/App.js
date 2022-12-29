import React, { useContext } from 'react'
import Profilestate from './context/profiles/Profilestate'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import Profiles from './pages/Profiles'
import Addprofile from './pages/Addprofile'
import profilecontext from './context/profiles/Profilecontext'

function App() {
  const context = useContext(profilecontext)
  const { loggedIn } = context;
  return (
    <>
      {/* <Profilestate> */}
      <BrowserRouter>
        <Routes>
          {/* {loggedIn === false && (<> */}
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} />
          {/* </>)} */}
          {loggedIn === true && (<>
          <Route path="/profile" element={<Profiles />} />
          <Route path="/addprofile" element={<Addprofile />} />
          </>)}
        </Routes>
      </BrowserRouter>
      {/* </Profilestate> */}
    </>
  )
}

export default App