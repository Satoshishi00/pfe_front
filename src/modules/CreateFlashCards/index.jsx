import React, { useState, useEffect, useCallback } from "react";

import StyledContainerInput from "components/ContainerInput";
import ButtonPrimary from "components/StyledButtons/ButtonPrimary";
import CustomInput from "components/CustomInput";
import FlashcardInput from "components/FlashcardInput";

import "react-toastify/dist/ReactToastify.css";
import ButtonSuccess from "components/StyledButtons/ButtonSuccess";

const CreateFlashCards = () => {
  const [fcName, setFcName] = useState("");
  const [rectoName, setRectoName] = useState("");
  const [versoName, setVersoName] = useState("");
  const [error, setError] = useState("");
  const [cardNumber, setCardNumber] = useState(1);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    addCard();
  }, []);

  const update = useCallback(
    (e, { name, value }) => {
      switch (name) {
        case "fcName":
          setFcName(value);
          break;
        case "recto_name":
          setRectoName(value);
          break;
        case "verso_name":
          setVersoName(value);
          break;
        default:
          break;
      }
    },
    [setFcName, setRectoName, setVersoName]
  );

  const addCard = e => {
    e && e.preventDefault();
    setCards([...cards, <FlashcardInput num={cardNumber} />]);

    setCardNumber(cardNumber + 1);
  };

  const buildList = useCallback(
    data => {
      console.log(data);
      if (typeof data.error !== undefined && data.error) {
        setError(data.error);
        console.log(error);
      } else {
        console.log("FC ajoutée");
      }
    },
    [error]
  );

  useEffect(() => {
    const URL =
      "http://127.0.0.1:8000/flashCards/new?recto_type=text&verso_type=text";
    fetch(URL, { method: "POST" })
      .then(response => response.json())
      .then(buildList)
      .catch(console.log("error AJAX request"));
  }, []);

  const createFc = e => {
    e.preventDefault();
    const URL =
      "http://127.0.0.1:8000/flashCards/new?recto_type=text&verso_type=text&fc_name=" +
      fcName +
      "&recto_name=" +
      rectoName +
      "&verso_name=" +
      versoName;
  };

  return (
    <div className="container">
      <h1 className="color-grey">Créer un deck</h1>
      <form onSubmit={() => {}}>
        <StyledContainerInput>
          <CustomInput
            type="text"
            key="fcName"
            update={update}
            value={fcName}
            placeholder="Nom"
            name="fcName"
            color="grey"
            className="ct-input"
          />
        </StyledContainerInput>

        <StyledContainerInput className="mg-t">
          <CustomInput
            type="text"
            key="recto_name"
            update={update}
            value={rectoName}
            placeholder="Nom du Recto"
            name="recto_name"
            color="grey"
            className="ct-input"
          />
          <CustomInput
            type="text"
            key="verso_name"
            update={update}
            value={versoName}
            placeholder="Nom du Recto"
            name="verso_name"
            color="grey"
            className="ct-input"
          />
        </StyledContainerInput>

        {cards.map(card => card)}

        <div className="btn-add-question-container">
          <ButtonSuccess className="btn-add-question" onClick={e => addCard(e)}>
            Nouvelle question
          </ButtonSuccess>
        </div>

        <ButtonPrimary id="btn-create-qcm" onClick={() => {}}>
          Fabriquer
        </ButtonPrimary>
      </form>
    </div>
  );
};

export default CreateFlashCards;
