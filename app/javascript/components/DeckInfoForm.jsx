import React, { useCallback, useEffect, useState } from "react";

import makeApiRequest from "../api/makeApiRequest";
import affiliationCardNameToImageSrc from "../util/affiliationCardNameToImageSrc";

const FACTIONS = [
  "Imperial Navy",
  "Scum and Villainy",
  "Sith",
  "Rebel Alliance",
  "Jedi",
  "Smugglers and Spies",
];

const DeckInfoForm = ({ deckData, onSave }) => {
  const [ nameState, setNameState ] = useState(deckData.name || "");
  const [ descriptionState, setDescriptionState ] = useState(deckData.description || "");
  const [ selectedFaction, setSelectedFaction ] = useState(FACTIONS.findIndex((el) => el === deckData.affiliation.affiliation_name));
  const [ affiliations, setAffiliations ] = useState([]);
  const [ selectedAffiliation, setSelectedAffiliation ] = useState(deckData.affiliation.id);

  useEffect(() => {
    async function getAffiliations() {
      const affiliations = await makeApiRequest('/api/affiliations');
      setAffiliations(affiliations);
    };

    getAffiliations();
  }, []);

  const getAffiliationOptions = (affiliations, selectedFaction) => {
    return affiliations.filter((aff) => aff.affiliation_name === FACTIONS[selectedFaction]);
  };

  const hasChanges = (nameState !== deckData.name) || (descriptionState !== deckData.description) || (selectedAffiliation !== deckData.affiliation.id)

  const handleSelectFaction = useCallback((selectedFactionId) => {
    return setSelectedFaction(selectedFactionId);
  }, [setSelectedFaction])

  return (
    <form>
      <div className="form-group">
        <label htmlFor="nameOfDeck">Deck Name</label>
        <input
          type="email"
          className="form-control"
          id="nameOfDeck"
          value={nameState}
          onChange={(evt) => setNameState(evt.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="descriptionOfDeck">Description</label>
        <textarea
          className="form-control"
          id="descriptionOfDeck"
          rows="5"
          value={descriptionState}
          onChange={(evt) => setDescriptionState(evt.target.value)}
        />
      </div>
      <div className="form-group">
        <div className="dropdown">
          <label htmlFor="factionSelect">Faction</label>
          <select className="form-select" id="factionSelect" value={selectedFaction} onChange={(evt) => handleSelectFaction(evt.target.value)}>
            <option value={0}>Imperial Navy</option>
            <option value={1}>Scum and Villainy</option>
            <option value={2}>Sith</option>
            <option value={3}>Rebel Alliance</option>
            <option value={4}>Jedi</option>
            <option value={5}>Smugglers and Spies</option>
          </select>
        </div>
      </div>
      <div className="form-group">
        <label>Affiliation Card</label>
        <div className="d-flex">
          {
            getAffiliationOptions(affiliations, selectedFaction).map((aff) =>
              <div key={`aff-radio-${aff.id}`} className="d-flex flex-column justify-content-center align-items-center m-2">
                <img src={affiliationCardNameToImageSrc(aff.name)} style={{ height: "200px" }}/>
                <input
                  className="form-check-input"
                  type="radio"
                  checked={selectedAffiliation == aff.id}
                  aria-label={aff.name}
                  onChange={() => setSelectedAffiliation(aff.id)}
                />
              </div>
            )
          }
        </div>
      </div>
      <div className="form-group">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => onSave(nameState, descriptionState, selectedAffiliation)}
        >
          Save
        </button>
        <div>
          { hasChanges ? 'Not saved!' : 'Saved!' }
        </div>
      </div>
    </form>
  )
}

export default DeckInfoForm;
