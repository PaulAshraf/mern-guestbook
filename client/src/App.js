import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Login from './pages/Login'
import Feed from './pages/Feed'
import SignUp from './pages/SignUp'
import Logo from './components/Logo'

function App() {
  return (
    <>
      <Logo />
      <Router>
        <Switch>
          <Route exact path='/login'><Login /></Route>
          <Route exact path='/signup'><SignUp /></Route>
          <Route exact path='/'><Feed /></Route>
        </Switch>
      </Router>
      
    </>
  )
}


export default App;
