import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Login from './pages/Login'
import Feed from './pages/Feed'
import SignUp from './pages/SignUp'
import Logo from './components/Logo'
import Message from './components/Message'

function App() {

  const [message, setMessage] = useState(null)
  const [type, setType] = useState(null)
  const [showToast, setShowToast] = useState(false)

  const displayMessage = (type, message) => {
      setType(type)
      setMessage(message)
      setShowToast(true)
  }

  return (
    <>
      <Message message={message} type={type} show={showToast} close={() => setShowToast(false)}/>
      <Logo />
      <Router>
        <Switch>
          <Route exact path='/login'><Login   displayMessage={displayMessage}/></Route>
          <Route exact path='/signup'><SignUp displayMessage={displayMessage}/></Route>
          <Route exact path='/'>      <Feed   displayMessage={displayMessage}/></Route>
        </Switch>
      </Router>
      
    </>
  )
}


export default App;
