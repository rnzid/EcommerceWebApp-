import { Routes,Route } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Header from './Parts/Header';
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
