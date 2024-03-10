import React from "react";
import { Tooltip } from "react-tooltip";

import CardPanel from "./CardPanel";
import SearchTooltipContent from "./SearchTooltipContent";
import getIconsFromIconString from "../util/getIconsFromIconString";

const DeckBuilder = ({
  cardList,
  getStylesFor,

  handleFilterFactionButtonClicked,
  handleFilterTypeButtonClicked,
  handleInputChange,
  handleOpenModal,
  handleSearchSubmit,
  handleUpdateToQuantity,

  isLightSideDeck,
  isDarkSideDeck
}) => {

  return (
    <>
      <div className="d-flex m-2">
        {
          isLightSideDeck && (
            <>
              <button type="button" className="flex-fill" onClick={() => handleFilterFactionButtonClicked("jedi")} style={getStylesFor("jedi")}><img className="faction-button-image" src="/jedi.png" /></button>
              <button type="button" className="flex-fill" onClick={() => handleFilterFactionButtonClicked("rebel")} style={getStylesFor("rebel")}><img className="faction-button-image" src="/rebels.png" /></button>
              <button type="button" className="flex-fill" onClick={() => handleFilterFactionButtonClicked("smugglers")} style={getStylesFor("smugglers")}><img className="faction-button-image" src="/smugglers.png" /></button>
            </>
          )
        }
        {
          isDarkSideDeck && (
            <>
              <button type="button" className="flex-fill" onClick={() => handleFilterFactionButtonClicked("imperial")} style={getStylesFor("imperial")}><img className="faction-button-image" src="/imperial.png" /></button>
              <button type="button" className="flex-fill" onClick={() => handleFilterFactionButtonClicked("sith")} style={getStylesFor("sith")}><img className="faction-button-image" src="/sith.png" /></button>
              <button type="button" className="flex-fill" onClick={() => handleFilterFactionButtonClicked("scum")} style={getStylesFor("scum")}><img className="faction-button-image" src="/scum.png" /></button>
            </>
          )
        }

        <button type="button" className="flex-fill" onClick={() => handleFilterFactionButtonClicked("neutral")} style={getStylesFor("neutral")}><i className="bi-circle" style={{ fontSize: "0.75rem" }}></i></button>
        
      </div>

      <div className="d-flex m-2">
        <button type="button" className="flex-fill" onClick={() => handleFilterTypeButtonClicked("objective")} style={getStylesFor("objective")}><i className="bi-bullseye"></i></button>{/* Objectives */}
        <button type="button" className="flex-fill" onClick={() => handleFilterTypeButtonClicked("unit")} style={getStylesFor("unit")}><i className="bi-person-fill"></i></button> {/* Units */}
        <button type="button" className="flex-fill" onClick={() => handleFilterTypeButtonClicked("enhancement")} style={getStylesFor("enhancement")}><i className="bi-paperclip"></i></button> {/* Enhancement */}
        <button type="button" className="flex-fill" onClick={() => handleFilterTypeButtonClicked("event")} style={getStylesFor("event")}><i className="bi-lightning-fill"></i></button> {/* Event */}
        <button type="button" className="flex-fill" onClick={() => handleFilterTypeButtonClicked("fate")} style={getStylesFor("fate")}><i className="bi-question-lg"></i></button> {/* Fate */}
        <button type="button" className="flex-fill" onClick={() => handleFilterTypeButtonClicked("mission")} style={getStylesFor("mission")}><i className="bi-list-task"></i></button> {/* Mission */}
      </div>

      <div className="input-group">
        <input className="form-control flex-fill" onChange={ handleInputChange } type="search" placeholder="Search" aria-label="Search" />
        <button className="btn btn-outline-success" onClick={ handleSearchSubmit }>Search</button>
        <div className="d-flex justify-content-center align-items-center">
          <a
            className="px-2"
            data-tooltip-id="search-tooltip"
          >
            Help
          </a>
        </div>
      </div>
      {/* EXTRACT THIS - SHARED WITH CardList */}
      <div className="container">
        <table className="table table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Type</th>
              <th>C.</th>
              <th>Icons</th>
              <th>F.</th>
              <th>HP</th>
              <th>R.</th>
              <th>{"  "}</th>
            </tr>
          </thead>
          <tbody>
            {
              cardList.map((card) =>
                <tr key={`card-${card.id}`}>
                  <td>
                    <button onClick={() => handleUpdateToQuantity(card.card_block_id, 0)} style={{ fontSize: "small" }}>0</button>
                    <button onClick={() => handleUpdateToQuantity(card.card_block_id, 1)} style={{ fontSize: "small" }}>1</button>
                    <button onClick={() => handleUpdateToQuantity(card.card_block_id, 2)} style={{ fontSize: "small" }}>2</button>
                  </td>
                  <td>
                    <div
                      className="link-primary"
                      data-tooltip-id={"card-tooltip"}
                      data-tooltip-content={ JSON.stringify(card) }
                      onClick={() => handleOpenModal(card.id)}
                    >
                      {card.name}
                    </div>
                  </td>
                  <td>{card.card_type}</td>
                  <td>{card.cost}</td>
                  <td>{getIconsFromIconString(card.combat_icons)}</td>
                  <td>{card.force}</td>
                  <td>{card.damage_capacity}</td>
                  <td>{card.resources}</td>
                </tr>
              )
            }
          </tbody>
        </table>
        <Tooltip
          className="card-tooltip"
          id="card-tooltip"
          place="right"
          style={{ backgroundColor: "white", color: "black", boxShadow: "0px 0px 4px grey", maxWidth: "400px" }}
          render={({ content }) => <CardPanel cardData={ JSON.parse(content) } />}
        />

        { /* The zIndex style is a hack to get around the search button's z-index */ }
        <Tooltip
          id="search-tooltip"
          place="left"
          style={{ zIndex: "100" }}
        >
          <SearchTooltipContent assumeFilterButtons />
        </Tooltip>
      </div>
    </>
  )
}

export default DeckBuilder;
