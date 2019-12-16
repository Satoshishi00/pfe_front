import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { UserContext } from "contexts/UserContext";

const TopBar = () => {
  const { user, setUser } = useContext(UserContext);

  const { points, image, id } = user;

  const toggle_dropdown = e => {
    let display = document.getElementById("dropdown_account").classList;
    display.toggle("flex");
    display.toggle("none");
    console.log(display);
  };

  const dropdown_on = e => {
    let display = document.getElementById("dropdown_account").classList;
    display.add("flex");
    display.remove("none");
    console.log(display);
  };

  const dropdown_off = e => {
    let display = document.getElementById("dropdown_account").classList;
    display.remove("flex");
    display.add("none");
    console.log(display);
  };

  const LogOut = e => {
    toast.success("Vous avez bien été déconnecté");
    dropdown_off();
  };

  return (
    <div>
      <div className="flex topbar">
        <div className="topbar-container flex">
          <Link
            className="link topbar-item-container flex center"
            to="/qcmList"
          >
            <span className="topbar-item center">QCM</span>
          </Link>
          <Link
            className="link topbar-item-container flex center"
            to="/flashcardsList"
          >
            <span className="topbar-item center">FC</span>
          </Link>
        </div>

        <div className="topbar-container topbar-title center">
          <Link className="bold link color-white" to="/home">
            Brainer
          </Link>
        </div>

        <div className="topbar-container flex">
          <div className="topbar-item-container flex center">
            <span className="topbar-item center">{points + " points"}</span>
          </div>
          <div
            className="flex fd-column"
            onMouseEnter={dropdown_on}
            onMouseLeave={dropdown_off}
          >
            <img
              className="topbar-account-img mg-r"
              src={
                image !== ""
                  ? "http://127.0.0.1:8000/medias/images/" + image
                  : "key.png"
              }
              style={{ borderRadius: image !== "" ? "50%" : "0%" }}
              alt=""
            />
            {(id && (
              <div id="dropdown_account" className="none dropdown-container">
                <Link
                  className="bold link color-grey dropdown-item"
                  to="/profil"
                >
                  Profil
                </Link>
                <Link className="bold link color-grey dropdown-item" to="/home">
                  Securité
                </Link>
                <Link
                  className="bold link color-grey dropdown-item"
                  to="/classroomList"
                >
                  Classe
                </Link>
                <Link
                  className="bold link color-grey dropdown-item"
                  to="/home"
                  onClick={LogOut}
                >
                  Déconnexion
                </Link>
              </div>
            )) || (
              <div id="dropdown_account" className="none dropdown-container">
                <Link
                  className="bold link color-grey dropdown-item"
                  to="/signin"
                >
                  Connexion
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <hr className="hr cent_pourcent"></hr>
    </div>
  );
};

export default TopBar;
