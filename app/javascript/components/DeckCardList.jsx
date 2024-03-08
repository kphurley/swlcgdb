import React from "react";
import _ from "lodash";
import { Tooltip } from "react-tooltip";
import { Link } from "react-router-dom";

import CardPanel from "../components/CardPanel";

const DeckCardListCardRow = ({ card }) =>
  <div className="row">
    <div>
      { `${card.quantity}x ` }
      <Link
        className="link-primary"
        data-tooltip-id="card-tooltip"
        data-tooltip-content={ JSON.stringify(card) }
        to={`/cards/${card.id}`}
      >
        {card.name}
      </Link>
    </div>
  </div>;

const DeckCardList = ({ deckData }) => {
  const deckCards = deckData?.cards || []

  const affiliationCardName = deckData?.affiliation?.name;
  const objectiveCards = deckCards.filter((c) => c.card_type === "Objective");
  const unitCards = deckCards.filter((c) => c.card_type === "Unit");
  const enhancementCards = deckCards.filter((c) => c.card_type === "Enhancement");
  const eventCards = deckCards.filter((c) => c.card_type === "Event");
  const fateCards = deckCards.filter((c) => c.card_type === "Fate");
  const missionCards = deckCards.filter((c) => c.card_type === "Mission");

  const NAMES_TO_SRC = {
    Jedi: "https://www.cardgamedb.com/forums/uploads/sw/ffg_jedi-core.png",
    'Rebel Alliance': "https://www.cardgamedb.com/forums/uploads/sw/ffg_rebel-alliance-core.png",
    'Smugglers and Spies': "https://www.cardgamedb.com/forums/uploads/sw/ffg_smugglers-and-spies-core.png",
    'Imperial Navy': "https://www.cardgamedb.com/forums/uploads/sw/ffg_imperial-navy-core.png",
    Sith: "https://www.cardgamedb.com/forums/uploads/sw/ffg_sith-core.png",
    'Scum and Villainy': "https://www.cardgamedb.com/forums/uploads/sw/ffg_scum-and-villainy-core.png",
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="container p-2">
            <p className="fw-bold">Objectives</p>
            {
              objectiveCards.map((card) => <DeckCardListCardRow card={card}/>)
            }
          </div>
        </div>
        <div className="col-md-6">
          <div className="container p-2">
            <img src={NAMES_TO_SRC[affiliationCardName]} style={{ height: "200px" }}/>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          {
            unitCards.length > 0 && <div className="container p-2">
              <p className="fw-bold">Units</p>
              {
                unitCards.map((card) => <DeckCardListCardRow card={card}/>)
              }
            </div>
          }

          {
            enhancementCards.length > 0 && <div className="container p-2">
              <p className="fw-bold">Enhancements</p>
              {
                enhancementCards.map((card) => <DeckCardListCardRow card={card}/>)
              }
            </div>
          }
        </div>
        <div className="col-md-6">
          {
            eventCards.length > 0 && <div className="container p-2">
              <p className="fw-bold">Events</p>
              {
                eventCards.map((card) => <DeckCardListCardRow card={card}/>)
              }
            </div>
          }

          {
            fateCards.length > 0 && <div className="container p-2">
              <p className="fw-bold">Fate</p>
              {
                fateCards.map((card) => <DeckCardListCardRow card={card}/>)
              }
            </div>
          }

          {
            missionCards.length > 0 && <div className="container p-2">
              <p className="fw-bold">Missions</p>
              {
                missionCards.map((card) => <DeckCardListCardRow card={card}/>)
              }
            </div>
          }
        </div>

        <Tooltip
          className="card-tooltip"
          id="card-tooltip"
          place="right"
          style={{ backgroundColor: "white", color: "black", boxShadow: "0px 0px 4px grey", maxWidth: "400px" }}
          render={({ content }) => <CardPanel cardData={ JSON.parse(content) } />}
        />
      </div>
    </div>
  )
}
  

export default DeckCardList;
