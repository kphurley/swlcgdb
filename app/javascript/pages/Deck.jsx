import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import _ from "lodash";

import makeApiRequest from "../api/makeApiRequest";
import { AuthContext } from "../components/AuthProvider";

import DeckCardList from "../components/DeckCardList";

// List all of the cards in a deck.
const Deck = () => {
  const [ deckData, setDeckData ] = useState({})
  const params = useParams();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function getDeckById() {
      const _set = await makeApiRequest(`/api/decks/${params.id}`);
      setDeckData(_set);
    };

    getDeckById();
  }, [])

  const isUserDeck = () => deckData?.user_id === user?.id;

  return (
    <div className="container">
      <div className="row">
        <h2>{ deckData.name }</h2>
        <div className="col-md-6">
          <DeckCardList deckData={ deckData } />
        </div>
        <div className="col-md-6">
          <div className="container">
            { isUserDeck() && <Link to={`/editDeck/${deckData.id}`}><button type="button" className="btn btn-primary mx-1">Edit</button></Link> }
            {/* TODO <Link><button type="button" className="btn btn-secondary mx-1">Clone</button></Link> */}
          </div>
          <div className="row">
            <div className="fw-bold">
              Description
            </div>
            <div>
              { deckData.description }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deck;