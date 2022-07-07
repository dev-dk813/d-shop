import React from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";

const UserRoute = ({ children, ...rest }) => {
  const users = useSelector((state) => ({ ...state.user.user.data }));
  return users && users.authToken ? (
    <Route {...rest} />
  ) : (
    <h1 className="text-danger">Loading...</h1>
  );
};

export default UserRoute;
