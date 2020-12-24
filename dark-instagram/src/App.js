import './App.css';
import React from 'react';
import {BrowserRouter as Router , Switch , Route} from 'react-router-dom';
import Header from './Components/header/Header'
import Home from './Pages/Home/home'
import Login from './Pages/login/login'
import Profile from './Pages/Profile/profile'
function App() {
  return (
    <Router> 
      <div className="App">
        <Header />
        <Switch >
          <Route path="/" exact component={Login} />
          <Route path="/home" exact component={Home} />
          <Route path="/profile" exact component={Profile} />
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;
