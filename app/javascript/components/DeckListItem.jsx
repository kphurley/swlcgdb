import React from "react";

const DeckListItem = ({ deck }) => {
  return (
    <div className="border-top">
      <div>{ deck.name }</div>
      <div>{ deck.description }</div>
      <div>{ deck.affiliation?.name }</div>
    </div>
  );
};

export default DeckListItem;
