import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CardInfo from "../components/CardPanel";
import getCardImageUrl from "../util/getCardImageUrl";

// List a description of the card with it's image
const Card = () => {
  const [ cardData, setCardData ] = useState({})
  const params = useParams();

  useEffect(() => {
    fetch(`/api/cards/${params.id}`).then((data) => {
      return data.json();
    }).then((_card) => {
      setCardData(_card);
    })
  }, [])

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="row">
            <div className="col-sm-6 col-sm-offset-1">
              <CardInfo includeFlavorText cardData={cardData} />
            </div>
            <div className="col-sm-4">
              { cardData.set && <img src={ getCardImageUrl(cardData) }></img> }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
