import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import _ from "lodash";

import makeApiRequest from "../api/makeApiRequest";

import CardPanel from "../components/CardPanel";

// List all of the cards in a deck.
// SO similar to Set.  TODO - Extract the common bits
const Deck = () => {
  const [ deckData, setDeckData ] = useState({})
  const params = useParams();

  useEffect(() => {
    async function getDeckById() {
      const _set = await makeApiRequest(`/api/decks/${params.id}`);
      setDeckData(_set);
    };

    getDeckById();
  }, [])

  const deckCards = deckData.cards || []
  const cardsByBlock = _.groupBy(deckCards, 'block')

  const getQuantityOfObjective = (objectiveCard) => {
    const foundBlock = deckData.card_blocks.find((blk) => blk.block == objectiveCard.block)

    return foundBlock ? foundBlock.quantity : 0;
  };

  return (
    <div className="container">
      <h2>{ deckData.name }</h2>
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
                  <tr>
                    <td>
                      {getQuantityOfObjective(objectiveCard)}
                    </td>
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
                  </tr>
                </>
              )
            })
          }
        </tbody>
      </table>
    </div>
  );
};

export default Deck;