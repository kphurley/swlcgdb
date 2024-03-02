import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import makeApiRequest from "../api/makeApiRequest";
import { AuthContext } from "../components/AuthProvider";
import DeckListItem from "../components/DeckListItem";


const MyDecks = () => {
  const [decks, setDecks] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    async function getDecks() {
      const decks = await makeApiRequest('/api/decks', { token });
      setDecks(decks);
    };

    getDecks();
  }, [])

  return (
    <>
      <h2>My Decks</h2>
      <div className="container">
        <div className="row">
          <div className="col-md-8 order-2">
            { 
              decks.map((deck) => <DeckListItem deck={deck} />)
            }
          </div>
          <div className="col-md-4 order-md-last order-first">
            <Link to="/createDeck">
              <button
                type="button"
                className="btn btn-primary"
              >
                Create New Deck
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyDecks;
