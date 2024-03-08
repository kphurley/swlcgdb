import React from "react";
import _ from "lodash";
import { Tooltip } from "react-tooltip";
import { Link } from "react-router-dom";

import CardPanel from "../components/CardPanel";
import affiliationCardNameToImageSrc from "../util/affiliationCardNameToImageSrc";

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

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="container p-2">
            <p className="fw-bold">Objectives</p>
            {
              objectiveCards.map((card) => <DeckCardListCardRow key={`dclcr-${card.id}`} card={card}/>)
            }
          </div>
        </div>
        <div className="col-md-6">
          <div className="container p-2">
            <img src={affiliationCardNameToImageSrc(affiliationCardName)} style={{ height: "200px" }}/>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          {
            unitCards.length > 0 && <div className="container p-2">
              <p className="fw-bold">Units</p>
              {
                unitCards.map((card) => <DeckCardListCardRow key={`dclcr-${card.id}`} card={card}/>)
              }
            </div>
          }

          {
            enhancementCards.length > 0 && <div className="container p-2">
              <p className="fw-bold">Enhancements</p>
              {
                enhancementCards.map((card) => <DeckCardListCardRow key={`dclcr-${card.id}`} card={card}/>)
              }
            </div>
          }
        </div>
        <div className="col-md-6">
          {
            eventCards.length > 0 && <div className="container p-2">
              <p className="fw-bold">Events</p>
              {
                eventCards.map((card) => <DeckCardListCardRow key={`dclcr-${card.id}`} card={card}/>)
              }
            </div>
          }

          {
            fateCards.length > 0 && <div className="container p-2">
              <p className="fw-bold">Fate</p>
              {
                fateCards.map((card) => <DeckCardListCardRow key={`dclcr-${card.id}`} card={card}/>)
              }
            </div>
          }

          {
            missionCards.length > 0 && <div className="container p-2">
              <p className="fw-bold">Missions</p>
              {
                missionCards.map((card) => <DeckCardListCardRow key={`dclcr-${card.id}`} card={card}/>)
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
