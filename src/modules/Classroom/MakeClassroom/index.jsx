import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "components/Loader";

import { useCookies } from "react-cookie";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ButtonPrimary from "components/StyledButtons/ButtonPrimary";
import ButtonSuccess from "components/StyledButtons/ButtonSuccess";

import CustomInput from "components/CustomInput";

const MakeClassroom = () => {
  const [cookies, setCookie] = useCookies([
    "brainer_id",
    "brainer_spepper",
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
  const [groupName, setGroupName] = useState("");

  const update = useCallback(
    (e, { name, value }) => {
      switch (name) {
        case "groupName":
          setGroupName(value);
          break;
        default:
          break;
      }
    },
    [setGroupName]
  );

  const addClassroom = e => {
    e.preventDefault();
    const URL = "http://127.0.0.1:8000/classroom/new?group_name=" + groupName;
    fetch(URL, {
      method: "PUT",
      headers: {
        id: cookies.brainer_id,
        pepper: cookies.brainer_pepper,
        security: "true",
        Accept: "application/json; odata=verbose"
      }
    })
      .then(response => response.json())
      .then(buildList)
      .catch();
  };

  const buildList = data => {
    if (typeof data.error !== undefined && data.error) {
      toast.error(data.error);
    } else {
      toast.success("Votre class '" + groupName + "' a bien était créée !");
      window.location.replace(window.location.origin + "/classroomList");
    }
  };

  return (
    <div className="container">
      <h1 className="color-grey">Créer une Classe</h1>

      <div className="qcms-container">
        <form action="" onSubmit={addClassroom}>
          <CustomInput
            type="text"
            key="groupName"
            update={update}
            value={groupName}
            placeholder="Nom"
            name="groupName"
            color="grey"
            className="ct-input"
          />

          <ButtonSuccess onClick={addClassroom}>Créer</ButtonSuccess>
        </form>
      </div>
    </div>
  );
};

export default MakeClassroom;
