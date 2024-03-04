import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import _ from "lodash";

import makeApiRequest from "../api/makeApiRequest";

import CardPanel from "../components/CardPanel";

import getIconsFromIconString from "../util/getIconsFromIconString";

// List all of the cards in a set.
const Set = () => {
  const [ setData, setSetData ] = useState({})
  const params = useParams();

  useEffect(() => {
    async function getCardSetById() {
      const _set = await makeApiRequest(`/api/card_sets/${params.id}`);
      setSetData(_set);
    };

    getCardSetById();
  }, [])

  // TODO - Do we need this?
  const setCardBlocks = setData.card_blocks || []
  setCardBlocks.sort((a, b) => a.block - b.block)

  const setCards = setData.cards || []
  const cardsByBlock = _.groupBy(setCards, 'block')

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
          { _.map(cardsByBlock, (cards, blockNum) => {
              const objectiveCard = cards.filter((c) => c.card_type === "Objective")[0];
              const nonObjectiveCards = cards
                                        .filter((c) => c.card_type !== "Objective")
                                        .sort((a, b) => a.block_number - b.block_number);

              return (
                <>
                  <tr>
                    <td>
                      <Link
                        className="link-primary"
                        data-tooltip-id={"card-tooltip"}
                        data-tooltip-content={ JSON.stringify(objectiveCard) }
                        to={`/cards/${objectiveCard.id}`}
                      >
                        {objectiveCard.name}
                      </Link>
                    </td>
                    <td>{objectiveCard.card_type}</td>
                    <td>{objectiveCard.cost}</td>
                    <td>{getIconsFromIconString(objectiveCard.combat_icons)}</td>
                    <td>{objectiveCard.force}</td>
                    <td>{objectiveCard.damage_capacity}</td>
                    <td>{objectiveCard.resources}</td>
                    <td>
                      <i
                        className="bi bi-chevron-right collapsed"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse-${blockNum}`}
                        aria-expanded="false"
                        aria-controls={`collapse-${blockNum}`}>
                      </i>
                    </td>
                  </tr>
                  {
                    nonObjectiveCards.map((card) =>
                      <tr className="collapse" id={`collapse-${blockNum}`} key={`card-row-${card.id}`}>
                        <td>&nbsp;&nbsp;<Link
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
                </>
              )
            })
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
  );
};

export default Set;
