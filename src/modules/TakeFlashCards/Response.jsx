import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";

const toggle = e => {
  e.preventDefault();
  let recto = document.getElementById("recto").classList;
  recto.toggle("img-front");
  recto.toggle("img-back");

  let verso = document.getElementById("verso").classList;
  verso.toggle("img-front");
  verso.toggle("img-back");
};

const Response = ({ fc, cards }) => {
  if (cards.length === 2) {
    //Soit on a une image au recto et du texte au verso
    if (fc.fc_recto_type === "media") {
      return (
        <div className="flashcards-cards-container">
          <div
            id="known_cards"
            className="center bold points-comptor points-red"
          >
            5
          </div>
          <div
            onClick={toggle}
            id="recto"
            className="absolute flashcards-card img-front"
          >
            <img
              className="flashcards-card-item"
              src={"http://127.0.0.1:8000/medias/images/" + cards[0].card_recto}
            ></img>
          </div>

          <div
            onClick={toggle}
            id="verso"
            className="absolute flashcards-card img-back"
          >
            <h3 id="unknown_cards" className="flashcards-card-item">
              {cards[1].last_card_verso}
            </h3>
          </div>
          <div className="center bold points-comptor points-green">5</div>
        </div>
      );
      //Autrement on a du text au recto et au verso
    } else {
      return (
        <div className="flashcards-cards-container">
          <div className="center bold points-comptor points-red">0</div>
          <div
            onClick={toggle}
            id="recto"
            className="absolute flashcards-card img-front"
          >
            <h3 id="known_cards" className="flashcards-card-item">
              {cards[0].card_recto}
            </h3>
          </div>

          <div
            onClick={toggle}
            id="verso"
            className="absolute flashcards-card img-back"
          >
            <h3 id="unknown_cards" className="flashcards-card-item">
              {cards[1].last_card_verso}
            </h3>
          </div>
          <div className="center bold points-comptor points-green">0</div>
        </div>
      );
    }
  }
};

export default Response;
