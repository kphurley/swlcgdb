import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import _ from "lodash";

import makeApiRequest from "../api/makeApiRequest";
import { AuthContext } from "../components/AuthProvider";

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
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

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
    try {
      const newDeck = await makeApiRequest("/api/decks", {
        token,
        method: 'POST',
        body: createDeckPayload,
      });
      
      // TODO - Navigate to edit deck page with the new deck
      // This page doesn't exist yet
      navigate(`/editDeck/${newDeck.id}`);
    } catch (err) {
      console.error("ERROR!", err);
    }
  }, [createDeckPayload])

  return (
    <form>
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
        <div className="dropdown">
          <label htmlFor="affiliationSelect">Affiliation Card</label>
          <select className="form-select" id="affiliationSelect" onChange={(evt) => handlePayloadUpdate("affiliation_id", parseInt(evt.target.value))}>
            {
              getAffiliationOptions(affiliations, selectedFaction).map((aff) =>
                <option value={aff.id} key={`aff-${aff.id}`}>{ aff.name }</option>
              )
            }
          </select>
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
