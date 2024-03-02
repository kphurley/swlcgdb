import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import _ from "lodash";

import makeApiRequest from "../api/makeApiRequest";

const EditDeck = () => {
  const { params } = useParams();

  useEffect(() => {
    async function getDeckById() {
      const deck = await makeApiRequest(`/api/decks/${params.id}`);
      setDeckData(deck);
    };

    getDeckById();
  }, [])

  
  return (
    <div>
      Edit Deck
    </div>
  );
};

export default EditDeck;
