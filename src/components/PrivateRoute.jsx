import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { currentUserSelector } from "../store/user/user.selector";

const PrivateRoute = ({ children }) => {
  const currentUser = useSelector(currentUserSelector);

  if (!currentUser?.accessToken)
    return <Navigate to="/login" />
  return children;
};

export default PrivateRoute;