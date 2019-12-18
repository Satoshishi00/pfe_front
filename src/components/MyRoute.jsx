import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useCookies } from "react-cookie";

const MyRoute = ({ logged, path, component, userId }) => {
  const [cookies, setCookie] = useCookies([
    "brainer_id",
    "brainer_spepper",
    "user_id"
  ]);
  //Si l'utilisateur a un id utilisateur en cookie
  //on le redirige vers sa route si elle existe
  //Autrement on le redirige vers la home
  if (cookies.brainer_id) {
    if (logged) {
      if (path === "/") {
        return <Redirect to="/home" />;
      }
      return <Route path={path} component={component} />;
    }
    return <Redirect to="/home" />;
  }
  //Si l'utilisateur doit être connecté, mais qu'il n'a pas de cookie
  //On considère qu'il n'est pas connecté
  if (logged) {
    return <Redirect to="/signin" />;
  }
  //Si l'utilisateur n'a pas de cookie et que la route qu'il veut prendre n'en nécessite pas
  //On le laisse y acceder
  return <Route path={path} component={component} />;
};

export default MyRoute;
