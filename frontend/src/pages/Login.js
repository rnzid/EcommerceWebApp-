import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";


const Login = () => {
    const navigate = useNavigate();
  const [state, setState] = useState({});

  const handleChange = (e) => {
    //console.log(e.target);
    // const name = e.target.name;
    // const value = e.target.value;
    const { name, value } = e.target;
    //console.log(name,value);
    setState((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const PostData = async (e) => {
    e.preventDefault();
    const { email, password } = state;

    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password
      }),
    });
    const data = await res.json();
    if (data.statusCode === 422 || !data) {
      window.alert("invalid user or password");
      console.log("fail reg");
    } else {
      console.log(data);
      localStorage.setItem("access_token",data.access_token)
      navigate("/");
      window.alert("LoginIn");
      console.log("sucess reg");
    }
  };


  return (
    <div className="container">
        <div className="row">
            <div className="col-md-4 offset-md-4">
                <div className="login-form bg-light mt-4 p-4">
                    <form method="POST" className="row g-3">
                        <h4>Login Page</h4>
                        <div className="col-12">
                            <label>Email</label>
                            <input type="text" name="email" value={state.email} onChange={handleChange} className="form-control" placeholder="Email"/>
                        </div>
                        <div className="col-12">
                            <label>Password</label>
                            <input type="password" name="password" value={state.password} onChange={handleChange} className="form-control" placeholder="Password"/>
                        </div>
                        <div className="col-12">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="rememberMe"/>
                                <label className="form-check-label" htmlFor="rememberMe"> Remember me</label>
                            </div>
                        </div>
                        <div className="col-12">
                            <button type="submit" className="btn btn-dark float-center" onClick={PostData}>Login</button>
                        </div>
                    </form>
                    <hr className="mt-4"/>
                    <div className="col-12">
                        <p className="text-center mb-0">Have not account yet? <Link to="/Signup">Signup</Link></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
  );
};

export default Login;
