import React from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TopBar = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    "brainer_id",
    "brainer_pepper",
    "user_id",
    "user_email",
    "user_username",
    "user_password",
    "user_nb_classes",
    "user_nb_qcm",
    "user_nb_flash_cards",
    "user_points",
    "user_premium",
    "user_image",
    "user_update_at",
    "user_created_at"
  ]);

  const toggle_dropdown = e => {
    let display = document.getElementById("dropdown_account").classList;
    display.toggle("flex");
    display.toggle("none");
    console.log(display);
  };

  const LogOut = e => {
    removeCookie("brainer_id");
    removeCookie("brainer_pepper");
    removeCookie("user_id");
    removeCookie("user_email");
    removeCookie("user_username");
    removeCookie("user_password");
    removeCookie("user_nb_classes");
    removeCookie("user_nb_qcm");
    removeCookie("user_nb_flash_cards");
    removeCookie("user_points");
    removeCookie("user_premium");
    removeCookie("user_image");
    removeCookie("user_update_at");
    removeCookie("user_created_at");
    toast.success("Vous avez bien été déconnecté");
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
            <span className="topbar-item center">
              {cookies.user_points ? cookies.user_points + " points" : ""}
            </span>
          </div>
          <div
            className="flex fd-column"
            onMouseEnter={toggle_dropdown}
            onMouseLeave={toggle_dropdown}
          >
            <img
              className="topbar-account-img mg-r"
              src={
                cookies.user_image
                  ? "http://127.0.0.1:8000/medias/images/" + cookies.user_image
                  : "favicon.ico"
              }
              alt=""
            />
            {(cookies.user_id && (
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
