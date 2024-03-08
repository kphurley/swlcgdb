import React, { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";


import makeApiRequest from "../api/makeApiRequest";
import CardPanel from "../components/CardPanel";

const CardNameMarkup = ({ card, currentCardId, onCardNameClick }) => {
  if (card.id === currentCardId) {
    return (
      <span className="fw-bold">{card.name}</span>
    )
  } else {
    return (
      <a
        className="link-primary"
        data-tooltip-id={"card-tooltip"}
        data-tooltip-content={ JSON.stringify(card) }
        onClick={() => onCardNameClick(card.id)}
      >
        <span>{card.name}</span>
      </a>
    )
  }
}

// A view for all of the cards in a given block
const CardBlockInfo = ({ cardBlockId, currentCardId, onCardNameClick }) => {
  const [ cardBlockData, setCardBlockData ] = useState([])

  useEffect(() => {
    async function getCardBlockById() {
      if (!cardBlockId) return;

      const data = await makeApiRequest(`/api/card_blocks/${cardBlockId}`);
      setCardBlockData(data);
    };

    getCardBlockById();
  }, [cardBlockId])

  if (Object.keys(cardBlockData).length === 0) return <></>;

  return (
    <div className="container">
      <div className="row">
        { cardBlockData?.cards.sort((a,b) => a.block_number - b.block_number).map((card) => {
            return (
              <div key={card.id}>
                <span>{`${card.block_number}. `}</span>
                <CardNameMarkup card={card} currentCardId={currentCardId} onCardNameClick={onCardNameClick}/>
              </div>
            )
          })
        }
      </div>
      <Tooltip
        className="card-tooltip"
        id="card-tooltip"
        place="right"
        style={{ backgroundColor: "white", color: "black", boxShadow: "0px 0px 4px grey", maxWidth: "400px" }}
        render={({ content }) => <CardPanel cardData={ JSON.parse(content) } />}
      />
    </div>
  );
}

export default CardBlockInfo;
