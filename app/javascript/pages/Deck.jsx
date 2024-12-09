import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import _ from "lodash";
import moment from "moment";

import makeApiRequest from "../api/makeApiRequest";
import { AuthContext } from "../components/AuthProvider";

import DeckCardList from "../components/DeckCardList";
import DeckStats from "../components/DeckStats";

// List all of the cards in a deck.
const Deck = () => {
  const [ deckData, setDeckData ] = useState({})
  const [ error, setError ] = useState(null)
  const params = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function getDeckById() {
      try {
        const set = await makeApiRequest(`/api/decks/${params.id}`);

        if (set.error) {
          throw new Error('API request failed');
        }

        setDeckData(set);
      } catch (err) {
        navigate('/decklists'); // Redirect because either there's a problem with this deck, or it doesn't exist
      }
    };

    getDeckById();
  }, [])

  const isUserDeck = (deckData, user) => deckData?.user?.id === user?.id;

  const deleteDeck = async () => {
    const res = await makeApiRequest(`/api/decks/${params.id}`, { method: 'DELETE' });

    if (res.message == 'success') {
      navigate('/myDecks');
    } else {
      setError('There was a problem deleting this deck!')
    }
  }

  return (
    <div className="container">
      { error &&
        <div className="alert alert-danger alert-dismissible" role="alert">
          <div>{ error }</div>
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      } 
      <div className="row bg-primary pt-4 mb-2">
        <h2 className="text-light text-center star-wars-font">{ deckData.name }</h2>
        <p className="text-light text-end">{ `Last updated: ${deckData && moment(deckData.updated_at).fromNow()}` }</p>
      </div>
      <div className="row">
        <div className="col-md-6">
          <DeckCardList deckData={ deckData } />
          <DeckStats deckData={ deckData } />
        </div>
        <div className="col-md-6">
          <div className="d-flex flex-row-reverse">
            { isUserDeck(deckData, user) && <Link to={`/editDeck/${deckData.id}`}><button type="button" className="btn btn-primary mx-1">Edit</button></Link> }
            { isUserDeck(deckData, user) && <button type="button" className="btn btn-danger mx-1" onClick={deleteDeck}>Delete</button> }
            {/* TODO <Link><button type="button" className="btn btn-secondary mx-1">Clone</button></Link> */}
          </div>
          <div className="row">
            <p className="fw-bold fs-4">
            { deckData?.user?.username }
            </p>
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