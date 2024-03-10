import React from "react";

const QuantityUpdateButtonGroup = ({ card, cardBlockIdToQuantity, handleUpdateToQuantity }) =>
  <div className="me-1">
    <button
      onClick={() => handleUpdateToQuantity(card.card_block_id, 0)}
      style={{
        backgroundColor: `${(!cardBlockIdToQuantity[card.card_block_id] || cardBlockIdToQuantity[card.card_block_id] === 0) ? "darkgrey" : "inherit"}`,
        fontSize: "small"
      }}
    >
      0
    </button>
    <button
      onClick={() => handleUpdateToQuantity(card.card_block_id, 1)}
      style={{
        backgroundColor: `${cardBlockIdToQuantity[card.card_block_id] === 1 ? "darkgrey" : "inherit"}`,
        fontSize: "small"
      }}
    >
      1
    </button>
    <button
      onClick={() => handleUpdateToQuantity(card.card_block_id, 2)}
      style={{
        backgroundColor: `${cardBlockIdToQuantity[card.card_block_id] === 2 ? "darkgrey" : "inherit"}`,
        fontSize: "small"
      }}
    >
      2
    </button>
  </div>;

export default QuantityUpdateButtonGroup;
