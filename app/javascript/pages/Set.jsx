import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactTooltip from "react-tooltip";
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
                        data-tip
                        data-for={`card-${objectiveCard.id}`}
                        to={`/cards/${objectiveCard.id}`}
                      >
                        {objectiveCard.name}
                      </Link>
                      <ReactTooltip
                        backgroundColor="white"
                        border
                        borderColor="black"
                        className="card-tooltip"
                        textColor="black"
                        id={`card-${objectiveCard.id}`}
                        place="right"
                      >
                        <CardPanel cardData={ objectiveCard } />
                      </ReactTooltip>
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
                          data-tip
                          data-for={`card-${card.id}`}
                          to={`/cards/${card.id}`}
                          >
                            {card.name}
                          </Link>
                          <ReactTooltip
                            backgroundColor="white"
                            border
                            borderColor="black"
                            className="card-tooltip"
                            textColor="black"
                            id={`card-${card.id}`}
                            place="right"
                          >
                            <CardPanel cardData={ card } />
                          </ReactTooltip>
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
    </div>
  );
};

export default Set;
