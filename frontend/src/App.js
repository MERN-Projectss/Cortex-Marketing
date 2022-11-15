import './App.css';
import Navbar from './UI/NavBar/Navbar';
import Register from "./UI/user/Register"
import {BrowserRouter as Router }       from 'react-router-dom'
//import Login from './UI/user/Login';

function App() {
return (
	<div className="App">
    <Router>
      <Navbar />
    {/* <Login  /> */}
    </Router>
	<Register />
	</div>
	
);
}

export default App;
