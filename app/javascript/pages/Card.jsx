import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import makeApiRequest from "../api/makeApiRequest";

import CardBlockInfo from "../components/CardBlockInfo";
import CardInfo from "../components/CardPanel";
import getCardImageUrl from "../util/getCardImageUrl";

// List a description of the card with it's image
const Card = () => {
  const [ cardData, setCardData ] = useState({})
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getCardById() {
      const _card = await makeApiRequest(`/api/cards/${params.id}`);
      setCardData(_card);
    };

    getCardById();
  }, [params])

  const navigateToCardPage = useCallback((cardId) => {
    navigate(`/cards/${cardId}`);
  }, [navigate]);

  if (Object.keys(cardData).length === 0) return <></>;

  return (
    <div className="container">
      <div className="row py-2">
        <div className="col-sm-6 col-sm-offset-1">
          <CardInfo includeFlavorText cardData={cardData} />
        </div>
        <div className="col-sm-4">
          { cardData.set && <img className="card-image" src={ getCardImageUrl(cardData) }></img> }
        </div>
      </div>
      <div className="row border-top py-2">
        <h3>Cards in Objective Set</h3>
        <CardBlockInfo cardBlockId={cardData?.card_block_id} currentCardId={parseInt(params.id)} onCardNameClick={navigateToCardPage} />
      </div>
    </div>
  );
}

export default Card;
