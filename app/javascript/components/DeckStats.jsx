import React from "react";

const DeckStats = ({ deckData }) => {
  const cards = deckData?.cards || [];
  const deckStats = {
    commandDeckCards: 0,
    forcePips: 0,
    resources: 0,
    objResources: 0,
    nonObjResources: 0,
  }

  cards.forEach((card) => {
    if (card.card_type !== "Objective") {
      deckStats.commandDeckCards += card.quantity;
      deckStats.nonObjResources += (card.resources * card.quantity);
    } else {
      deckStats.objResources += (card.resources * card.quantity);
    }

    if (card.resources) {
      deckStats.resources += (card.quantity * card.resources);
    }

    if (card.force) {
      deckStats.forcePips += (card.quantity * card.force);
    }
  });

  return (
    <div className="container p-4">
      <p className="fw-bold">Deck Stats</p>
      <div>{ `Cards in command deck: ${deckStats.commandDeckCards}` }</div>
      <div>{ `Total force pips: ${deckStats.forcePips}` }</div>
      <div>{ `Total resources: ${deckStats.resources}` }</div>
      <div>{ `Resources from objectives: ${deckStats.objResources}` }</div>
      <div>{ `Resources from command deck: ${deckStats.nonObjResources}` }</div>
    </div>
  )
}
  

export default DeckStats;
