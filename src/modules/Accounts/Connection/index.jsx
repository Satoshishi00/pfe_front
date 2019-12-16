import React, { useState, useCallback, useContext } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

import StyledContainerInput from "components/ContainerInput";
import ButtonPrimary from "components/StyledButtons/ButtonPrimary";
import ButtonBlank from "components/StyledButtons/ButtonBlank";
import CustomInput from "components/CustomInput";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { UserContext } from "contexts/UserContext";

const Connection = ({ history }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { user, setUser } = useContext(UserContext);

  const { brainer_id, brainer_pepper } = user;

  const update = useCallback(
    (e, { name, value }) => {
      switch (name) {
        case "password":
          setPassword(value);
          break;
        case "username":
          setEmail(value);
          break;
        default:
          break;
      }
    },
    [setPassword, setEmail]
  );

  const buildList = data => {
    if (typeof data.error !== undefined && data.error) {
      toast.error(data.error);
    } else {
      toast.success("Bienvenue " + data.username + " !");

      setUser({
        ...user,
        brainer_id: data.id,
        brainer_pepper: data.pepper,
        id: data.id,
        email: data.email,
        username: data.username,
        image: data.image,
        nb_classes: data.nb_classes,
        nb_flash_cards: data.nb_flash_cards,
        nb_qcm: data.nb_qcm,
        points: data.points,
        premium: data.premium,
        created_at: data.created_at,
        updated_at: data.updated_at
      });
      history.push("/home");
    }
  };

  const signup = e => {
    e.preventDefault();
    const URL =
      "http://127.0.0.1:8000/login?email=" + email + "&password=" + password;
    fetch(URL, {
      method: "POST",
      headers: {
        id: brainer_id,
        pepper: brainer_pepper,
        security: "false",
        Accept: "application/json; odata=verbose"
      }
    })
      .then(response => response.json())
      .then(buildList)
      .catch();
  };

  return (
    <div className="container">
      <h1 className="color-grey">Se connecter</h1>
      <form onSubmit={signup}>
        <StyledContainerInput>
          <CustomInput
            type="text"
            key="email"
            update={update}
            value={email}
            placeholder="Email"
            name="username"
            color="grey"
            className="ct-input"
          />
          <div className="flex">
            <CustomInput
              type="password"
              key="password"
              update={update}
              value={password}
              placeholder="Mot de passe"
              name="password"
              color="grey"
              className="ct-input"
            />
            <Link className="bold link color-grey oublie" to="/missing_pwd">
              oublié ?
            </Link>
          </div>
        </StyledContainerInput>

        <ButtonPrimary onClick={signup}>Se Connecter</ButtonPrimary>
      </form>

      <hr className="hr"></hr>

      <div className="flex">
        <ButtonBlank className="mg-r">
          <i className="fab fa-facebook-f fb-color mg-r"></i>
          <span className="fb-color">Facebook</span>
        </ButtonBlank>
        <ButtonBlank className="mg-l">
          <img src="/logo-google.png" alt="" className="logo-google mg-r" />
          <span>Google</span>
        </ButtonBlank>
      </div>

      <p className="center bold color-grey">
        Tu n'as pas de compte ?{" "}
        <Link className="link" to="/signup">
          S'inscrire
        </Link>
      </p>
    </div>
  );
};

export default Connection;
