import React, { useCallback, useContext, useEffect, useState } from "react";
import { createPortal } from 'react-dom';
import { useParams } from "react-router-dom";
import _ from "lodash";
import { Tooltip } from "react-tooltip";


import makeApiRequest from "../api/makeApiRequest";
import CardModal from "../components/CardModal";
import CardPanel from "../components/CardPanel";
import DeckCardList from "../components/DeckCardList";
import getIconsFromIconString from "../util/getIconsFromIconString";

const EditDeck = () => {
  const [ deckData, setDeckData ] = useState({})
  const [ cardList, setCardList ] = useState([])
  const [ searchString, setSearchString ] = useState("")
  const [ filterFactionButtonEnabled, setFilterFactionButtonClicked ] = useState(null)
  const [ filterTypeButtonEnabled, setFilterTypeButtonEnabled ] = useState(null)
  const [ modalState, setModalState ] = useState({ enabled: false, cardId: null} )
  const [ deckUpdatePayload, setDeckUpdatePayload ] = useState({});
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
    setDeckUpdatePayload({
      ...deckUpdatePayload,
      [cardBlockId]: quantity
    })
  }, [deckUpdatePayload, setDeckUpdatePayload]);

  const parseUpdatePayload = (deckData) => {
    const payload = {}

    deckData.card_blocks.forEach((blk) => {
      payload[blk.id] = blk.quantity
    });

    return payload;
  }

  // On Load - set up the deckUpdatePayload and deck contents
  useEffect(() => {
    async function getDeckById() {
      const deck = await makeApiRequest(`/api/decks/${params.id}`);

      if (deck.error) {
        setError(deck.error);
      } else {
        setDeckData(deck);
        setDeckUpdatePayload(parseUpdatePayload(deck));
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
    // This is very important!  If deckUpdatePayload is empty, don't blow it away!
    if (Object.keys(deckUpdatePayload).length === 0) return;

    async function putDeckById() {
      // The deckUpdatePayload is really just a mapping of card_block_id to quantity
      // This is a convenience for the front end
      // The api needs this as an array of objects, e.g. [{ card_block_id: 2, quantity: 1 }, ...]
      // TODO - Is this worth it?  It might be ok to edit the deck directly and just PUT changes to it.
      const formattedPayload = formatDeckUpdatePayload(deckUpdatePayload);

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
  }, [deckUpdatePayload])

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
          <DeckCardList deckData={ deckData } />
        </div>
        <div className="col-md-6">
          <div className="d-flex m-2">
            {
              isLightSideDeck && (
                <>
                  <button type="button" className="flex-fill" onClick={() => handleFilterFactionButtonClicked("jedi")} style={getStylesFor("jedi")}><img className="faction-button-image" src="/jedi.png" /></button>
                  <button type="button" className="flex-fill" onClick={() => handleFilterFactionButtonClicked("rebel")} style={getStylesFor("rebel")}><img className="faction-button-image" src="/rebels.png" /></button>
                  <button type="button" className="flex-fill" onClick={() => handleFilterFactionButtonClicked("smugglers")} style={getStylesFor("smugglers")}><img className="faction-button-image" src="/smugglers.png" /></button>
                </>
              )
            }
            {
              isDarkSideDeck && (
                <>
                  <button type="button" className="flex-fill" onClick={() => handleFilterFactionButtonClicked("imperial")} style={getStylesFor("imperial")}><img className="faction-button-image" src="/imperial.png" /></button>
                  <button type="button" className="flex-fill" onClick={() => handleFilterFactionButtonClicked("sith")} style={getStylesFor("sith")}><img className="faction-button-image" src="/sith.png" /></button>
                  <button type="button" className="flex-fill" onClick={() => handleFilterFactionButtonClicked("scum")} style={getStylesFor("scum")}><img className="faction-button-image" src="/scum.png" /></button>
                </>
              )
            }

            <button type="button" className="flex-fill" onClick={() => handleFilterFactionButtonClicked("neutral")} style={getStylesFor("neutral")}><i className="bi-circle" style={{ fontSize: "0.75rem" }}></i></button>
            
          </div>

          <div className="d-flex m-2">
            <button type="button" className="flex-fill" onClick={() => handleFilterTypeButtonClicked("objective")} style={getStylesFor("objective")}><i className="bi-bullseye"></i></button>{/* Objectives */}
            <button type="button" className="flex-fill" onClick={() => handleFilterTypeButtonClicked("unit")} style={getStylesFor("unit")}><i className="bi-person-fill"></i></button> {/* Units */}
            <button type="button" className="flex-fill" onClick={() => handleFilterTypeButtonClicked("enhancement")} style={getStylesFor("enhancement")}><i className="bi-paperclip"></i></button> {/* Enhancement */}
            <button type="button" className="flex-fill" onClick={() => handleFilterTypeButtonClicked("event")} style={getStylesFor("event")}><i className="bi-lightning-fill"></i></button> {/* Event */}
            <button type="button" className="flex-fill" onClick={() => handleFilterTypeButtonClicked("fate")} style={getStylesFor("fate")}><i className="bi-question-lg"></i></button> {/* Fate */}
            <button type="button" className="flex-fill" onClick={() => handleFilterTypeButtonClicked("mission")} style={getStylesFor("mission")}><i className="bi-list-task"></i></button> {/* Mission */}
          </div>

          <div className="input-group">
            <input className="form-control flex-fill" onChange={ handleInputChange } type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" onClick={ handleSearchSubmit }>Search</button>
          </div>
          {/* EXTRACT THIS - SHARED WITH CardList */}
          <div className="container">
            <table className="table table-sm">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>C.</th>
                  <th>Icons</th>
                  <th>F.</th>
                  <th>HP</th>
                  <th>R.</th>
                  <th>{"  "}</th>
                </tr>
              </thead>
              <tbody>
                {
                  cardList.map((card) =>
                    <tr key={`card-${card.id}`}>
                      <td>
                        {/* TODO - REPLACE WITH A CLICK TO A MODAL TO ADD TO DECK */}
                        <div
                          className="link-primary"
                          data-tooltip-id={"card-tooltip"}
                          data-tooltip-content={ JSON.stringify(card) }
                          onClick={() => handleOpenModal(card.id)}
                        >
                          {card.name}
                        </div>
                      </td>
                      <td>{card.card_type}</td>
                      <td>{card.cost}</td>
                      <td>{getIconsFromIconString(card.combat_icons)}</td>
                      <td>{card.force}</td>
                      <td>{card.damage_capacity}</td>
                      <td>{card.resources}</td>
                    </tr>
                  )
                }
              </tbody>
            </table>
            <Tooltip
              className="card-tooltip"
              id="card-tooltip"
              place="right"
              style={{ backgroundColor: "white", color: "black", boxShadow: "0px 0px 4px grey", maxWidth: "400px" }}
              render={({ content }) => <CardPanel cardData={ JSON.parse(content) } />}
            />
          </div>
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
