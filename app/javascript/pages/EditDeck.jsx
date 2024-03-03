import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import _ from "lodash";

import makeApiRequest from "../api/makeApiRequest";
import DeckCardList from "../components/DeckCardList";

const EditDeck = () => {
  const [ deckData, setDeckData ] = useState({})
  const params = useParams();

  useEffect(() => {
    async function getDeckById() {
      const deck = await makeApiRequest(`/api/decks/${params.id}`);
      setDeckData(deck);
    };

    getDeckById();
  }, [])

  
  return (
    <div className="container">
      <div className="row">
        <h2>{ deckData.name }</h2>
        <div className="col-md-6">
          <DeckCardList deckData={ deckData } />
        </div>
        <div className="col-md-6">
          DeckCardPicker?
          {/* <DeckCardPicker deckData={ deckData } callbacksForUpdates /> */}
        </div>
      </div>
    </div>
  );
};

export default EditDeck;
