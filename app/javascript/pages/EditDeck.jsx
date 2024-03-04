import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import _ from "lodash";
import { Tooltip } from "react-tooltip";

import makeApiRequest from "../api/makeApiRequest";
import CardPanel from "../components/CardPanel";
import DeckCardList from "../components/DeckCardList";
import getIconsFromIconString from "../util/getIconsFromIconString";

const EditDeck = () => {
  const [ deckData, setDeckData ] = useState({})
  const [ cardList, setCardList ] = useState([])
  const [ searchString, setSearchString ] = useState("")
  const params = useParams();

  const handleInputChange = (e) => {
    setSearchString(e.target.value);
  }

  const handleSearchSubmit = useCallback(async () => {
    const _list = await makeApiRequest(`${window.location.origin}/api/search`, {
      method: 'POST',
      body: { searchString },
    });
    setCardList(_list);
  }, [searchString])

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
          {/* TODO - ADD PRESET BUTTONS TO FILTER TYPES */}
          <input className="form-control me-2" onChange={ handleInputChange } type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success" onClick={ handleSearchSubmit }>Search</button>
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
                  <th>D.</th>
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
                        <Link
                          className="link-primary"
                          data-tooltip-id={"card-tooltip"}
                          data-tooltip-content={ JSON.stringify(card) }
                          to={`/cards/${card.id}`}
                        >
                          {card.name}
                        </Link>
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
              style={{ backgroundColor: "white", border: "solid", color: "black" }}
              render={({ content }) => <CardPanel cardData={ JSON.parse(content) } />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditDeck;
