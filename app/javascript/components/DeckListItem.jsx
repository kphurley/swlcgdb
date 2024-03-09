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

const DeckListItem = ({ deck, includeAuthor }) => {
  const mapAffiliationNameToImageSrc = (deck) => `/${AFFILIATION_NAME_TO_IMAGE_SRC[deck.affiliation.affiliation_name]}.png`;

  return (
    <div className="d-flex border-top py-2">
      <img className="deck-list-item-faction-icon p-2" src={mapAffiliationNameToImageSrc(deck)} />
      <div className="flex-grow">
        <Link to={`/decks/${deck.id}`}><div>{ deck.name }</div></Link>
        { includeAuthor && <div>{ `by ${deck.user.username}` }</div> }
        <div>{ deck.affiliation?.name }</div>
      </div>
    </div>
  );
};

export default DeckListItem;
