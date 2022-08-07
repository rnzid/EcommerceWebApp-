import { Routes, Route } from "react-router-dom";
//import jwt_decode from "jwt-decode";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Signup from "./pages/Signup";
import Navbar from "./Components/Navbar";
import { Fragment } from "react";
import { roles } from "./constants/roles";
import { useDispatch } from "react-redux";
import { setUser, login, logout } from "./redux/reducer/auth";
import axios from "axios";
import Index from "./pages/Product/Index"
import Show from "./pages/Product/Show"
import PageNotFound from "./Components/PageNotFound"
import Order from "./pages/Order";
import ProtectedRoute from "./Components/ProtectedRoute";
import Dashboard from "./pages/Dashboard"
import Checkout from "./pages/Checkout";
import Store from "./pages/Product/Store";
import Update from "./pages/Product/Update";

function App() {
  const dispatch = useDispatch();

  /* load logged user when page refresh  */
  if (localStorage.getItem("access_token")) {
    dispatch(login());

    // get user from token
    axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/get-user`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        dispatch(login());
        dispatch(setUser(res.data));
      })
      .catch((err) => {
        dispatch(logout());
      });
  } else {
    dispatch(logout());
  }

  return (
    <Fragment>
      <div className="App">
        <Navbar />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="products">
          <Route index element={<Index />} />
          <Route path=":id" element={<Show />} />
        </Route>
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route element={<ProtectedRoute />} >
          <Route path="orders" element={<Order />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
        <Route element={<ProtectedRoute
          access_to={roles.SELLER}
        />} >
          <Route path="sellers">
            <Route index element={<Dashboard />} /> 
            <Route path="dashboard" element={<Dashboard />} />
             <Route path="products">
              <Route index element={<Index />} />
              <Route path="store" element={<Store />} />
              <Route path=":id" element={<Show />} />
              <Route path="edit/:id" element={<Update />} />
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
      </div>
    </Fragment>
  );
}

export default App;
