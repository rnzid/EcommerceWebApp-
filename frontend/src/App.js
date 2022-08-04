import { Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Signup from './pages/Signup';
import Header from './Components/Header';
import About from './pages/About';
import Product from './pages/Product';
import { Fragment } from 'react';
import './App.css';

function App() {
 
  return (
    <Fragment>
      <div className='App'>
          
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="Login" element={<Login />} />
          <Route path="Logout" element={<Logout />} />
          <Route path="Signup" element={<Signup />}/>
          <Route path="About" element={<About />}/>
          <Route path="Product" element={<Product />}/>
        </Routes>
      </div>
    </Fragment>
    );
}

export default App;
