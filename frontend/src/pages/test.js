
const Navbar = () => {
    const { user,is_logged_in } = useSelector((state) => state.auth)
  
      let { pathname } = useLocation();
  
      if (pathname == "/login" || pathname == "/signup") {
          return null;
      }
  
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              Navbar
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item me-2 text-white bg-dark">
                  <Link to="/">Home</Link>
                </li>
                <li className="nav-item me-2">
                  <Link to="About">About</Link>
                </li>
                <li className="nav-item  me-2 text-white bg-dark">
                  <Link to="Product">Product</Link>
                </li>
              </ul>
              <form className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  />
  
                <button className="btn btn-outline-success me-2" type="submit">
                  <Link to="login">login</Link>
                </button>
                <button className="btn btn-outline-success me-2" type="submit">
                  <Link to="signup">Signup</Link>
                </button>
              </form>
            </div>
          </div>
        </nav>
      </div>
    );
  };
  

