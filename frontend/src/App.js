import React, { useContext } from 'react'
import Profilestate from './context/profiles/Profilestate'
import Router from './Router'

function App() {

  return (
    <>
      <Profilestate>
          <Router/>
      </Profilestate>
    </>
  )
}

export default App
