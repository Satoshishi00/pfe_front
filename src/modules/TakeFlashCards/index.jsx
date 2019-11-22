import React, { useState, useCallback, useEffect } from "react";
import Loader from "components/Loader";

import ButtonPrimary from "components/StyledButtons/ButtonPrimary";
import ButtonSuccess from "components/StyledButtons/ButtonSuccess";
import ButtonDanger from "components/StyledButtons/ButtonDanger";

import LittleInput from "components/LittleInput";

import Response from "./Response";

const TakeFlashCards = () => {
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState([]);
  const [fc, setFc] = useState([]);
  const [answer, setAnswer] = useState("");
  const [cardsDone, setCardsDone] = useState([]);

  const buildList = useCallback(
    data => {
      console.log(data.error);
      if (typeof data.error !== "undefined" && data.error) {
        const error = data.error;
        console.log(error);
      } else {
        console.log(data[1]);
        setFc(data[0]);
        //On retire la première ligne du tableau qui contient le nom et la description du cards
        data.splice(0, 1);
        setCards(data);
        cardsDone.push(data[0].card_id);
        setCardsDone(cardsDone);
        console.log("cardsDone", cardsDone);
      }

      setLoading(false);
    },
    [cardsDone]
  );

  useEffect(() => {
    const curent_url = window.location.href;
    const id_fc = curent_url.split("/")[4];
    const URL =
      "http://127.0.0.1:8000/flashCards/" +
      id_fc +
      "/getRandomCard?last_card_id=151&exept_cards_array=[]";
    fetch(URL, { method: "POST", body: [cardsDone] })
      .then(response => response.json())
      .then(buildList)
      .catch(console.log("error AJAX request"));
  }, []);

  const onSubmit = e => {
    e.preventDefault();
    console.log(cards[0].card_id);
    const curent_url = window.location.href;
    const id_fc = curent_url.split("/")[4];
    const URL =
      "http://127.0.0.1:8000/flashCards/" +
      id_fc +
      "/getRandomCard?last_card_id=" +
      cards[0].card_id +
      "&exept_cards_array=[]";
    console.log("string", cardsDone);
    fetch(URL, {
      method: "POST",
      body: JSON.stringify({ exept_cards_array: cardsDone }),
      headers: { "Content-type": "application/json" }
    })
      .then(response => response.json())
      .then(buildList)
      .catch(console.log("error AJAX request"));
  };

  return (
    <div className="container">
      <h2 className="color-grey">FlashCards - {fc.fc_name}</h2>

      <h2 className="color-grey">
        {fc.fc_recto_name} - {fc.fc_verso_name}
      </h2>

      <div className="remaining-cards">{fc.fc_nb_cards}</div>

      <form id="form" onSubmit={onSubmit}>
        <Loader loading={loading} render={<Response fc={fc} cards={cards} />} />

        <div className="flex">
          <ButtonDanger className="mg-l mg-r">
            <i className="far fa-thumbs-down"></i>
          </ButtonDanger>
          <ButtonSuccess className="mg-l mg-r">
            <i className="far fa-thumbs-up"></i>
          </ButtonSuccess>
        </div>
      </form>
    </div>
  );
};

export default TakeFlashCards;
