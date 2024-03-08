import React, { useState } from "react";

const DeckInfoForm = ({ deckData, onSave }) => {
  const [ nameState, setNameState ] = useState(deckData.name || "");
  const [ descriptionState, setDescriptionState ] = useState(deckData.description || "");

  const hasChanges = (nameState !== deckData.name) || (descriptionState !== deckData.description)

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
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => onSave(nameState, descriptionState)}
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
