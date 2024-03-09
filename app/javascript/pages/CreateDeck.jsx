import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import _ from "lodash";

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

const CreateDeck = () => {
  const [ affiliations, setAffiliations ] = useState([]);
  const [ selectedFaction, setSelectedFaction ] = useState(FACTIONS[0]);
  const [ createDeckPayload, setCreateDeckPayload ] = useState({});
  const [ error, setError ] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getAffiliations() {
      const affiliations = await makeApiRequest('/api/affiliations');
      setAffiliations(affiliations);
    };

    getAffiliations();
  }, []);

  const handlePayloadUpdate = useCallback((key, value) => {
    const updatedPayload = {
      ...createDeckPayload,
      [key]: value
    }

    setCreateDeckPayload(updatedPayload);
  }, [createDeckPayload, setCreateDeckPayload]);

  const handleSelectFaction = useCallback((selectedFactionId) => {
    return setSelectedFaction(FACTIONS[selectedFactionId]);
  }, [setSelectedFaction])

  const getAffiliationOptions = (affiliations, selectedFaction) => {
    if (affiliations.length === 0 || !selectedFaction) {
      return [];
    }

    return affiliations.filter((aff) => aff.affiliation_name === selectedFaction);
  };

  const onSubmit = useCallback(async () => {
    // Sometimes, it's possible to use the default affiliation without selecting it
    // We have to account for that case or the save will fail
    // The modifiedPayload always sets the default affiliation (from the core set)
    const modifiedPayload = { ...createDeckPayload };
    if (!modifiedPayload.affiliation_id) {
      modifiedPayload.affiliation_id = affiliations.find((aff) => aff.affiliation_name === selectedFaction).id;
    }

    try {
      const newDeck = await makeApiRequest("/api/decks", {
        method: 'POST',
        body: modifiedPayload,
      });
      
      if (newDeck.error) {
        setError(newDeck.error)
      } else {
        navigate(`/editDeck/${newDeck.id}`);
      }
    } catch (err) {
      setError(err);
    }
  }, [affiliations, createDeckPayload, selectedFaction])

  return (
    <form>
      { error &&
          <div className="alert alert-danger alert-dismissible" role="alert">
            <div>{ error }</div>
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        } 
      <div className="form-group">
        <label htmlFor="nameOfDeck">Deck Name</label>
        <input
          type="email"
          className="form-control"
          id="nameOfDeck"
          onChange={(evt) => handlePayloadUpdate("name", evt.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="descriptionOfDeck">Description</label>
        <textarea
          className="form-control"
          id="descriptionOfDeck"
          rows="3"
          onChange={(evt) => handlePayloadUpdate("description", evt.target.value)}
        />
      </div>
      <div className="form-group">
        <div className="dropdown">
          <label htmlFor="factionSelect">Faction</label>
          <select className="form-select" id="factionSelect" onChange={(evt) => handleSelectFaction(evt.target.value)}>
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
                  checked={createDeckPayload.affiliation_id == aff.id}
                  aria-label={aff.name}
                  onChange={() => handlePayloadUpdate("affiliation_id", aff.id)}
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
          onClick={onSubmit}
        >
          Create Deck
        </button>
      </div>
    </form>
  );
};

export default CreateDeck;
