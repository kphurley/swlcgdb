import React, { useEffect, useState } from "react";

import CardBlockInfo from "./CardBlockInfo";
import CardPanel from "./CardPanel";
import makeApiRequest from "../api/makeApiRequest";
import getCardImageUrl from "../util/getCardImageUrl";

export default function CardModal({ cardId, onClose, onCardNameClick }) {
  const [ cardData, setCardData ] = useState({})

  useEffect(() => {
    async function getCardById() {
      const _card = await makeApiRequest(`/api/cards/${cardId}`);
      setCardData(_card);
    };

    getCardById();
  }, [cardId])

  return (
    <div className="card-modal">
      { 
        Object.keys(cardData).length > 0 && 
          <div className="container">
            <div className="row py-2">
              <div className="col-sm-4">
                <CardPanel includeFlavorText cardData={cardData} />
              </div>
              <div className="col-sm-4">
                { cardData.set && <img src={ getCardImageUrl(cardData) }></img> }
              </div>
            </div>
            <div className="row border-top py-2">
              <h3>Cards in Objective Set</h3>
              <CardBlockInfo cardBlockId={cardData?.card_block_id} currentCardId={parseInt(cardId)} onCardNameClick={(cardId) => onCardNameClick(cardId)} />
            </div>
            <div className="row border-top py-2">
              <span>
                <span className="px-2">Add this objective to deck:</span>
                <button type="button" className="btn btn-secondary">1</button>
                <button type="button" className="btn btn-secondary">2</button>
              </span>
            </div>
          </div>
      }
      <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
    </div>
    
  );
}
