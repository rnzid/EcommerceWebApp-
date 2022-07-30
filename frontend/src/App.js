import { Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Header from './Components/Header';
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
          <Route path="Signup" element={<Signup />}/>
        </Routes>
      </div>
    </Fragment>
    );
}

export default App;
