import React from "react";
import { Route } from "react-router-dom";

const MyRoute = ({ logged, path, component, userId }) => {
  //Control if user is logged and if is neessary to be logged
  /*if (userId) {
    if (logged) {
      if (path === "/") {
        return <Redirect to="/rooms" />;
      }
      return <Route path={path} component={component} />;
    }
    return <Redirect to="/rooms" />;
  }
  if (logged) {
    return <Redirect to="/signin" />;
  }*/
  return <Route path={path} component={component} />;
};

export default MyRoute;
