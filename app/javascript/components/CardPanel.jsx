import React from "react";

// Component to handle displaying Card vitals
// Should be reused by Card page and Card popover
const CardPanel = ({ cardData, includeFlavorText}) =>
  <div className="panel panel-default">
    <div className="panel-heading">
      <h3 className="panel-title card-name">{ cardData.name }</h3>
    </div>
    <div className="panel-body">
      <div className="card-type-and-cost">
        { `${cardData.card_type}.  Cost: ${cardData.cost}` }
      </div>
      <div className="card-icons">
        {/* TODO - Translate this text to icons */}
        { cardData.icons }
      </div>
      <div className="card-traits">
        { cardData.traits }
      </div>
      <div className="card-text">
        { cardData.text }
      </div>
      { 
        includeFlavorText && <div className="card-flavor">
          { cardData.flavor }
        </div>
      }
    </div>
</div>

export default CardPanel;
