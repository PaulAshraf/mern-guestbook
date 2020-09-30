import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route} from 'react-router-dom'

import Login from './pages/Login'


import Logo from './components/Logo'
import SignUp from './pages/SignUp'

function App() {
  return (
    <>
      <Logo />
      <Router>
        <Route path='/login'><Login /></Route>
        <Route path='/signup'><SignUp /></Route>
      </Router>
      
    </>
  )
}

export default App;
