import React from "react";
import { useSelector } from "react-redux";
import LoadingToRedirect from "../../components/LoadingToRedirect";
import UserNav from "../../components/nav/UserNav";

const Password = () => {
  const users = useSelector((state) => state.user.user);
  const userData = users.data;
  return (
    <div className="container-fluid">
      {userData && userData.authToken ? (
        <div className="row">
          <div className="col-md-2">
            <UserNav />
          </div>
          <div className="col">
            <h3>Password Update</h3>
            <input
              className="input"
              type="password"
              placeholder="Update your Password"
            ></input>
            <button className="btn btn-outline-dark mx-3">Update</button>
          </div>
        </div>
      ) : (
        <LoadingToRedirect />
      )}
    </div>
  );
};

export default Password;
