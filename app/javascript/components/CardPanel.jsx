import React from "react";
import _ from "lodash";

import { formatCardTraits } from "../util/textFormatters";
import getIconsFromIconString from "../util/getIconsFromIconString";

// Component to handle displaying Card vitals
// Should be reused by Card page and Card popover
const CardPanel = ({ cardData, includeFlavorText}) => {
  const uniqueNameModifier = cardData.traits?.includes("Unique") ? "♦ " : "";
  const formattedTraits = cardData.traits && formatCardTraits(cardData.traits);

  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <span className="panel-title card-name">{ `${uniqueNameModifier}${cardData.name}` }</span>
      </div>
      <div className="panel-body">
        <div className="card-force-pips">
          { `Force: ${cardData.force}` }
        </div>
        <div className="card-type-and-cost">
          { `${cardData.affiliation}. ${cardData.card_type}. Cost: ${cardData.cost}` }
        </div>
        <div className="card-resources">
          { `Resources: ${cardData.resources}` }
        </div>
        <div className="card-combat-icons">
          { getIconsFromIconString(cardData.combat_icons) }
        </div>
        <div className="card-traits">
          <b><em>{ formattedTraits }</em></b>
        </div>
        <div className="card-text">
          { 
            cardData.text?.split("\r\n").map((line, idx) =>
              <div className="card-text-line" key={`card-${cardData.id}-line-${idx}`}>{ line }</div>
            )
          }
        </div>
        <div className="card-damage-capacity">
          { `Damage Capacity: ${cardData.damage_capacity}` }
        </div>
        { 
          includeFlavorText && <div className="card-flavor">
            { cardData.flavor }
          </div>
        }
      </div>
    </div>
  )
}
  

export default CardPanel;
