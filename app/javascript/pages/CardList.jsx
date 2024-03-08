import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import _ from "lodash";

import makeApiRequest from "../api/makeApiRequest";

import CardPanel from "../components/CardPanel";

import getIconsFromIconString from "../util/getIconsFromIconString";

// List all of the cards in a card search result.
// (This is so similar to Set, consider combining them)
const CardList = () => {
  const [ cardList, setCardList ] = useState([])
  const params = useParams();

  useEffect(() => {
    async function searchForCards() {
      const _list = await makeApiRequest("/api/search", {
        method: 'POST',
        body: { searchString: params.searchString },
      });
      setCardList(_list);
    };

    searchForCards();
  }, [params.searchString])

  // TODO - Extract this (shared with EditDeck)
  return (
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
        style={{ backgroundColor: "white", color: "black", boxShadow: "0px 0px 4px grey", maxWidth: "400px" }}
        render={({ content }) => <CardPanel cardData={ JSON.parse(content) } />}
      />
    </div>
  );
};

export default CardList;
