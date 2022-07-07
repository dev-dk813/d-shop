import React, { useState } from "react";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../functions/auth";
import {
  loginFail,
  loginStart,
  loginSuccess,
} from "../../reducers/userReducer";

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();
  const location = useLocation();
  // console.log(state);

  // const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const handelSubmit = async (e) => {
    e.preventDefault();
    let Email = credentials.email;
    let Password = credentials.password;
    login({ email: Email, password: Password })
      .then((res) => {
        let data = res.data;
        dispatch(loginStart());
        console.log(data);
        if (data.success) {
          dispatch(loginSuccess(res.data));

          //Save the authtoken and role
          localStorage.setItem("token", data.authToken);
          localStorage.setItem("role", data.role);
          toast.success("Logged In Successfully! ");

          //Rederict based on roles
          // console.log(state);
          let intended = location.state;
          if (intended) {
            navigate(intended.from);
          } else {
            if (data.role === "admin") {
              navigate("/admin/dashboard");
            } else {
              navigate("/user/history");
            }
          }

          //Show error else
        } else {
          toast.error("Invalid Credentials!");
        }
      })
      .catch((err) => {
        dispatch(loginFail());
        toast.error(err.response.data.err);
      });
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="mt-3 container">
      <h1>Login to continue...</h1>
      <form className="my-4" onSubmit={handelSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={onChange}
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            value={credentials.password}
            onChange={onChange}
            id="password"
            name="password"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
