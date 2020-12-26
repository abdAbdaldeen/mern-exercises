import Login from './Pages/login/login'
import Todo from './Pages/todo/todo1'
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router , Switch , Route} from 'react-router-dom';
import Google from './Pages/testgoogle';
function App() {

  return (
    <div className="App">
      <Router>
      
      <Switch >
        <Route path="/" exact component={Login} />
        <Route path="/todo" component={Todo} />
      </Switch>
     
      </Router>

    </div>
  );
}

export default App;
