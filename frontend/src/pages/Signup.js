import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { roles } from "../constants/roles";
import ErrorMessage from "../Components/ErrorMessage";

const Signup = () => {
  let navigate = useNavigate();

  const [validation_errors, setValidationErrors] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  // store to localstorage and to redux store
  const [state, setState] = useState({
    name: "test",
    email: "test@test.com",
    password: "password",
    role: "buyer",
  });

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
    const { name, email, password, role } = state;
    let data = { name, email, password, role };
    let url = `${process.env.REACT_APP_SERVER_DOMAIN}/signup`;
    axios
      .post(url, data)
      .then(res => {
        navigate("/login");
      })
      .catch((err) => {
        let mapped_errors = err.response.data.errors.map((el) => {
          return { [el.param]: el.msg };
        });
        setValidationErrors(Object.assign({}, ...mapped_errors));
      });
  };

  let roles_arr = Object.entries(roles);
  let roles_mapping = roles_arr.map((el) => {
    return <option value={el[1]}>{el[0]}</option>;
  });
  console.log(state);
  return (
    <div>
      <section className="vh-100" style={{ backgroundColor: "#eee" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Sign up
                      </p>

                      <form className="mx-1 mx-md-4" method="POST">
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i
                            htmlFor="name"
                            className="fas fa-user fa-lg me-3 fa-fw"
                          ></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              id="form3Example1c"
                              name="name"
                              onChange={handleChange}
                              className="form-control"
                              placeholder="Your Name"
                            />
                          </div>
                        </div>
                        <ErrorMessage message={validation_errors.name} />
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="email"
                              name="email"
                              onChange={handleChange}
                              id="form3Example3c"
                              className="form-control"
                              placeholder=" your email"
                            />
                          </div>
                        </div>
                        <ErrorMessage message={validation_errors.email} />
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fa-solid fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <select
                              name="role"
                              className="form-control"
                              onChange={handleChange}
                            >
                              {roles_mapping}
                            </select>
                          </div>
                          <ErrorMessage message={validation_errors.role} />
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              name="password"
                              onChange={handleChange}
                              className="form-control"
                              placeholder="Password"
                            />
                          </div>
                        </div>
                        <ErrorMessage message={validation_errors.password} />
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              // name="cPassword"
                              // onChange={handleChange}
                              className="form-control"
                              placeholder="Repeat your password"
                            />
                          </div>
                        </div>
                        <ErrorMessage message={validation_errors.password} />
                        <div className="form-check d-flex justify-content-center mb-5">
                          <input
                            className="form-check-input me-2"
                            type="checkbox"
                            value=""
                            id="form2Example3c"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="form2Example3"
                          >
                            I agree all statements in{" "}
                            <a href="#!">Terms of service</a>
                          </label>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="button"
                            className="btn btn-primary btn-lg"
                            onClick={PostData}
                          >
                            Register
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid"
                        alt="Sample image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signup;
