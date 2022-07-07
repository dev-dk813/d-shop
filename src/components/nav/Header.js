import { useDispatch, useSelector } from "react-redux";
import { Badge } from "antd";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logout } from "../../reducers/userReducer";
import {
  ShoppingCartOutlined,
  ShopOutlined,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Search from "../forms/Search";

const Header = () => {
  const { cart } = useSelector((state) => ({ ...state }));
  const Role = localStorage.getItem("role");
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout(null));
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Ecommerce
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
            <li className="nav-item">
              <Link key="home" className="nav-link" aria-current="page" to="/">
                <HomeOutlined className="h5 m-0" /> Home
              </Link>
            </li>
            <li className="nav-item">
              <Link key="shop" className="nav-link" to="/shop">
                <ShopOutlined className="h5 m-0" /> Shop
              </Link>
            </li>
            <li className="nav-item">
              <Link key="cart" className="nav-link" to="/cart">
                <ShoppingCartOutlined className="h5 m-0" />{" "}
                <Badge
                  className="text-light"
                  count={cart.userCart.length}
                  offset={[9, 0]}
                >
                  Cart
                </Badge>
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="/"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <UserOutlined className="h5 m-0" /> USER
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <Link className="dropdown-item" to="/user/history">
                    Dashboard
                  </Link>
                </li>
                <li>
                  {Role === "admin" && (
                    <Link className="dropdown-item" to="/admin/dashboard">
                      Admin (ONLY)
                    </Link>
                  )}
                </li>
                {!localStorage.getItem("token") ? (
                  <>
                    <li>
                      <Link key="login" className="dropdown-item" to="/login">
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        key="register"
                        className="dropdown-item"
                        to="/register"
                      >
                        Register
                      </Link>
                    </li>
                  </>
                ) : (
                  <button
                    className="btn btn-outline-danger mx-3"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <span className="flex-end p-1">
        <Search />
      </span>
    </nav>
  );
};

export default Header;
