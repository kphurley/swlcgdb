import React, { useCallback, useEffect, useState } from "react";
import { createPortal } from 'react-dom';
import { useParams } from "react-router-dom";
import _ from "lodash";

import makeApiRequest from "../api/makeApiRequest";
import CardModal from "../components/CardModal";
import DeckBuilder from "../components/DeckBuilder";
import DeckInfoForm from "../components/DeckInfoForm";
import DeckCardList from "../components/DeckCardList";

const EditDeck = () => {
  const [ activeTab, setActiveTab ] = useState("Build")
  const [ deckData, setDeckData ] = useState({})
  const [ cardList, setCardList ] = useState([])
  const [ searchString, setSearchString ] = useState("")
  const [ filterFactionButtonEnabled, setFilterFactionButtonClicked ] = useState(null)
  const [ filterTypeButtonEnabled, setFilterTypeButtonEnabled ] = useState(null)
  const [ modalState, setModalState ] = useState({ enabled: false, cardId: null} )
  const [ cardBlockIdToQuantity, setCardBlockIdToQuantity ] = useState({});
  const [ error, setError ] = useState(null);
  const params = useParams();

  const isLightSideDeck = deckData?.affiliation?.side == "Light";
  const isDarkSideDeck = deckData?.affiliation?.side == "Dark";

  const handleInputChange = (e) => {
    setSearchString(e.target.value || "");
  }

  const handleSearchSubmit = useCallback(async () => {
    const factionQueryString = filterFactionButtonEnabled ? `a:${filterFactionButtonEnabled}` : ""
    const typeQueryString = filterTypeButtonEnabled ? `t:${filterTypeButtonEnabled}` : "";
    const sideString = `s:${deckData.affiliation.side}`;
    const finalSearchString = [sideString, factionQueryString, typeQueryString, searchString].join(",");

    const _list = await makeApiRequest(`${window.location.origin}/api/search`, {
      method: 'POST',
      body: { searchString: finalSearchString },
    });

    if (_list.error) {
      setError(_list.error);
    } else {
      setCardList(_list);
      setError(null);
    }
  }, [deckData, filterFactionButtonEnabled, filterTypeButtonEnabled, searchString])

  const handleFilterFactionButtonClicked = useCallback((property) => {
    if (filterFactionButtonEnabled === property) {
      return setFilterFactionButtonClicked(null);
    } else {
      return setFilterFactionButtonClicked(property);
    }
  }, [filterFactionButtonEnabled, setFilterFactionButtonClicked])

  const handleFilterTypeButtonClicked = useCallback((property) => {
    if (filterTypeButtonEnabled === property) {
      return setFilterTypeButtonEnabled(null);
    } else {
      return setFilterTypeButtonEnabled(property);
    }
  }, [filterTypeButtonEnabled, setFilterTypeButtonEnabled])

  const handleOpenModal = useCallback((cardId) => {
    setModalState({ cardId, enabled: true })
  }, [setModalState]);

  const handleCloseModal = useCallback(() => {
    setModalState({ cardId: null, enabled: false })
  }, [setModalState]);

  const handleUpdateModal = useCallback((cardId) => {
    setModalState({ ...modalState, cardId: cardId })
  }, [modalState, setModalState]);

  const handleUpdateToQuantity = useCallback((cardBlockId, quantity) => {
    setCardBlockIdToQuantity({
      ...cardBlockIdToQuantity,
      [cardBlockId]: quantity
    })
  }, [cardBlockIdToQuantity, setCardBlockIdToQuantity]);

  const handleUpdateToInfo = useCallback(async (name, description) => {
    const deck = await makeApiRequest(`/api/decks/${params.id}`, {
      method: 'PUT',
      body: { name, description }
    });

    if (deck.error) {
      setError(deck.error);
    } else {
      setDeckData(deck);
      setError(null);
    }   
  }, [params]);

  const parseUpdatePayload = (deckData) => {
    const payload = {}

    deckData.card_blocks.forEach((blk) => {
      payload[blk.id] = blk.quantity
    });

    return payload;
  }

  // On Load - set up the cardBlockIdToQuantity and deck contents
  useEffect(() => {
    async function getDeckById() {
      const deck = await makeApiRequest(`/api/decks/${params.id}`);

      if (deck.error) {
        setError(deck.error);
      } else {
        setDeckData(deck);
        setCardBlockIdToQuantity(parseUpdatePayload(deck));
        setError(null);
      }
    };

    getDeckById();
  }, [])

  const formatDeckUpdatePayload = (payload) => {
    return Object.keys(payload).map((key) => {
      return { id: key, quantity: payload[key] }
    });
  };

  // On an update to the payload - Persist the update and update the deck's contents
  useEffect(() => {
    // This is very important!  If cardBlockIdToQuantity is empty, don't blow it away!
    if (Object.keys(cardBlockIdToQuantity).length === 0) return;

    async function putDeckById() {
      // The cardBlockIdToQuantity is really just a mapping of card_block_id to quantity
      // This is a convenience for the front end
      // The api needs this as an array of objects, e.g. [{ card_block_id: 2, quantity: 1 }, ...]
      // TODO - Is this worth it?  It might be ok to edit the deck directly and just PUT changes to it.
      const formattedPayload = formatDeckUpdatePayload(cardBlockIdToQuantity);

      const deck = await makeApiRequest(`/api/decks/${params.id}`, {
        method: 'PUT',
        body: { card_blocks: formattedPayload }
      });

      if (deck.error) {
        setError(deck.error);
      } else {
        setDeckData(deck);
        setError(null);
      }
    };

    putDeckById();
  }, [cardBlockIdToQuantity])

  useEffect(() => {
    async function getQueryStringAndSearch() {
      const factionQueryString = filterFactionButtonEnabled ? `a:${filterFactionButtonEnabled}` : ""
      const typeQueryString = filterTypeButtonEnabled ? `t:${filterTypeButtonEnabled}` : "";
      const sideString = `s:${deckData.affiliation.side}`;
      const finalSearchString = [sideString, factionQueryString, typeQueryString, searchString].join(",");

      const _list = await makeApiRequest(`${window.location.origin}/api/search`, {
        method: 'POST',
        body: { searchString: finalSearchString },
      });
  
      if (_list.error) {
        setError(_list.error);
      } else {
        setCardList(_list);
        setError(null);
      }
    };
    
    if(filterFactionButtonEnabled === null && filterTypeButtonEnabled === null) return;

    getQueryStringAndSearch();
  }, [filterFactionButtonEnabled, filterTypeButtonEnabled, setCardList])

  const getStylesFor = useCallback((property) => {
    if (filterFactionButtonEnabled === property) {
      return { backgroundColor: "darkgrey" }
    } else if (filterTypeButtonEnabled === property) {
      return { backgroundColor: "darkgrey" }
    } else {
      return {}
    }
  }, [filterFactionButtonEnabled, filterTypeButtonEnabled]);

  const getActiveTabComponent = useCallback((activeTab) => {
    switch(activeTab) {
      case "Build":
        return (
          <DeckBuilder
            cardBlockIdToQuantity={cardBlockIdToQuantity}
            cardList={cardList}
            getStylesFor={getStylesFor}
            handleFilterFactionButtonClicked={handleFilterFactionButtonClicked}
            handleFilterTypeButtonClicked={handleFilterTypeButtonClicked}
            handleInputChange={handleInputChange}
            handleOpenModal={handleOpenModal}
            handleSearchSubmit={handleSearchSubmit}
            handleUpdateToQuantity={handleUpdateToQuantity}
            isLightSideDeck={isLightSideDeck}
            isDarkSideDeck={isDarkSideDeck}
          />
        )
      case "Info":
        return (
          <DeckInfoForm
            name={deckData.name}
            description={deckData.description}
            deckData={deckData}
            onSave={handleUpdateToInfo}
          />
        )
    }
  }, [
    cardList,
    getStylesFor,
    handleFilterFactionButtonClicked,
    handleFilterTypeButtonClicked,
    handleInputChange,
    handleOpenModal,
    handleSearchSubmit,
    handleUpdateToQuantity,
    isLightSideDeck,
    isDarkSideDeck
  ])

  return (
    <div className="container">
      <div className="row">
        <h2>{ deckData.name }</h2>
        { error &&
          <div className="alert alert-danger alert-dismissible" role="alert">
            <div>{ error }</div>
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        } 
        <div className="col-md-6">
          <DeckCardList
            cardBlockIdToQuantity={cardBlockIdToQuantity}
            handleUpdateToQuantity={handleUpdateToQuantity}
            deckData={deckData}
          />
        </div>
        <div className="col-md-6">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a className={ activeTab == "Build" ? "nav-link active" : "nav-link"} onClick={() => setActiveTab("Build")}>Build</a>
            </li>
            <li className="nav-item">
              <a className={ activeTab == "Info" ? "nav-link active" : "nav-link"} onClick={() => setActiveTab("Info")}>Info</a>
            </li>
          </ul>
          { getActiveTabComponent(activeTab) }
        </div>
      </div>
      {modalState.enabled && createPortal(
        <CardModal
          cardId={ modalState.cardId }
          onClose={() => handleCloseModal()}
          onCardNameClick={handleUpdateModal}
          onQuantitySelection={handleUpdateToQuantity}
        />,
        document.body
      )}
    </div>
  );
};

export default EditDeck;
