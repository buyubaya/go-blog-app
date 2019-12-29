import React from "react";
import {
  Redirect,
} from "react-router-dom";


const ProtectedRoute = ({
  user,
  children,
}) => {

  if (!user) {
    return <Redirect to="/login" />;
  }


  return (
    children
  );
};


export default ProtectedRoute;