import React, { useEffect, useState } from "react";

import makeApiRequest from "../api/makeApiRequest";
import DeckListItem from "../components/DeckListItem";

const Home = () => {
  const [ recentDecks, setRecentDecks ] = useState([]);
  useEffect(() => {
    async function getMostRecentDecksByFaction() {
      const decks = await makeApiRequest("api/decks/byFaction/mostRecent");
      setRecentDecks(decks);
    };

    getMostRecentDecksByFaction();
  }, []);

  const recentJediDeck = recentDecks.find((d) => d.affiliation.affiliation_name === "Jedi");
  const recentRebelDeck = recentDecks.find((d) => d.affiliation.affiliation_name === "Rebel Alliance");
  const recentSmugglersDeck = recentDecks.find((d) => d.affiliation.affiliation_name === "Smugglers and Spies");
  const recentImperialDeck = recentDecks.find((d) => d.affiliation.affiliation_name === "Imperial Navy");
  const recentSithDeck = recentDecks.find((d) => d.affiliation.affiliation_name === "Sith");
  const recentScumDeck = recentDecks.find((d) => d.affiliation.affiliation_name === "Scum and Villainy");

  return (
    <>
      <div className="container-fluid py-5 text-center">
        <h1 className="display-1 fw-bold home-page-title">SWLCG DB</h1>
        <h2>Deckbuilder for Star Wars: The Card Game</h2>
      </div>
      <div className="container pb-5">
        <div className="row">
          <div className="col-lg-6">
            { recentJediDeck && <DeckListItem includeAuthor deck={recentJediDeck} /> }
            { recentRebelDeck && <DeckListItem includeAuthor deck={recentRebelDeck} /> }
            { recentSmugglersDeck && <DeckListItem includeAuthor deck={recentSmugglersDeck} /> }
          </div>
          <div className="col-lg-6">
            { recentImperialDeck && <DeckListItem includeAuthor deck={recentImperialDeck} /> }
            { recentSithDeck && <DeckListItem includeAuthor deck={recentSithDeck} /> }
            { recentScumDeck && <DeckListItem includeAuthor deck={recentScumDeck} /> }
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
