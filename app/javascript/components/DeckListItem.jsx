import React from "react";
import { Link } from "react-router-dom";

const AFFILIATION_NAME_TO_IMAGE_SRC = {
  'Jedi': 'jedi',
  'Rebel Alliance': 'rebels',
  'Smugglers and Spies': 'smugglers',
  'Imperial Navy': 'imperial',
  'Sith': 'sith',
  'Scum and Villainy': 'scum',
}

const DeckListItem = ({ deck }) => {
  const mapAffiliationNameToImageSrc = (deck) => `/${AFFILIATION_NAME_TO_IMAGE_SRC[deck.affiliation.affiliation_name]}.png`;

  return (
    <div className="row border-top py-2">
      <div className="col-sm-2 position-relative">
        <img className="deck-list-item-faction-icon position-absolute top-50 start-50 translate-middle p-2" src={mapAffiliationNameToImageSrc(deck)} />
      </div>
      <div className="col-sm-10">
        <Link to={`/decks/${deck.id}`}><div>{ deck.name }</div></Link>
        <div>{ deck.affiliation?.name }</div>
      </div>
    </div>
  );
};

export default DeckListItem;
