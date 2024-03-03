import React from "react";
import { Link } from "react-router-dom";

const DeckListItem = ({ deck }) => {
  return (
    <div className="border-top">
      <Link to={`/decks/${deck.id}`}><div>{ deck.name }</div></Link>
      <div>{ deck.description }</div>
      <div>{ deck.affiliation?.name }</div>
    </div>
  );
};

export default DeckListItem;
