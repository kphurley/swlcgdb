import React from "react";
import _ from "lodash";
import { Tooltip } from "react-tooltip";
import { Link } from "react-router-dom";

import CardPanel from "../components/CardPanel";

const DeckCardList = ({ deckData }) => {
  const deckCards = deckData?.cards || []
  const cardsByBlock = _.groupBy(deckCards, 'block')

  const getQuantityOfObjective = (objectiveCard) => {
    const foundBlock = deckData?.card_blocks.find((blk) => blk.block == objectiveCard.block)

    return foundBlock ? foundBlock.quantity : 0;
  };


  return (
    <>
      <h4>Objectives</h4>
      <table className="table table-sm">
        <thead>
          <tr>
            <th>Quantity</th>
            <th>Name</th>
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
                  <tr key={`block-${blockNum}`}>
                    <td>
                      {getQuantityOfObjective(objectiveCard)}
                    </td>
                    <td>
                      <Link
                        className="link-primary"
                        data-tooltip-id="card-tooltip"
                        data-tooltip-content={ JSON.stringify(objectiveCard) }
                        to={`/cards/${objectiveCard.id}`}
                      >
                        {objectiveCard.name}
                      </Link>
                    </td>
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
                        <td>
                        </td>
                        <td>&nbsp;&nbsp;<Link
                          className="link-primary"
                          data-tooltip-id="card-tooltip"
                          data-tooltip-content={ JSON.stringify(card) }
                          to={`/cards/${card.id}`}
                          >
                            {card.name}
                          </Link>
                        </td>
                      </tr>
                    )
                  }
                </>
              )
            })
          }
        </tbody>
      </table>

      <h4>Cards</h4>
      <table className="table table-sm">
        <thead>
          <tr>
            <th>Quantity</th>
            <th>Name</th>
            <th>{"  "}</th>
          </tr>
        </thead>
        <tbody>
          { _.map(deckCards, (card) => {
              return (
                <>
                  <tr>
                    <td>
                      {card.quantity}
                    </td>
                    <td>
                      <Link
                        className="link-primary"
                        data-tooltip-id="card-tooltip"
                        data-tooltip-content={ JSON.stringify(card) }
                        to={`/cards/${card.id}`}
                      >
                        {card.name}
                      </Link>
                    </td>
                  </tr>
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
    </>
  )
}
  

export default DeckCardList;