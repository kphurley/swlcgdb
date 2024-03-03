import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactTooltip from "react-tooltip";
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
                    data-tip
                    data-for={`card-${card.id}`}
                    to={`/cards/${card.id}`}
                  >
                    {card.name}
                  </Link>
                  {/* <ReactTooltip
                    backgroundColor="white"
                    border
                    borderColor="black"
                    className="card-tooltip"
                    textColor="black"
                    id={`card-${card.id}`}
                    place="right"
                  >
                    <CardPanel cardData={ card } />
                  </ReactTooltip> */}
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
    </div>
  );
};

export default CardList;
