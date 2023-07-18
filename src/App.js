//import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.slim.js';
import 'fontawesome-free/css/all.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import './carousel.css';
import {BrowserRouter as Router} from "react-router-dom";
import Routes from './Routes/Routes';

function App() {
  const user=JSON.parse(localStorage.getItem("user"));

  return (
    <Router>
        <Routes user={user}/>
    </Router>
  );
}

export default App;
