import React, { useCallback, useEffect, useState } from "react";

import makeApiRequest from "../api/makeApiRequest";
import DeckListItem from "../components/DeckListItem";
import PaginationLinks from "../components/PaginationLinks";

const Decklists = () => {
  const [decks, setDecks] = useState([]);
  const [paginationMetadata, setPaginationMetadata] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function getDecks() {
      const decksResponse = await makeApiRequest(`/api/decks?page=${currentPage}`);
      setDecks(decksResponse.data);
      setPaginationMetadata(decksResponse.pagy);
    };

    getDecks();
  }, [currentPage])

  return (
    <>
      <h2>Decklists</h2>
      <div className="container">
        <PaginationLinks paginationMetadata={paginationMetadata} setCurrentPage={setCurrentPage} />
        <div className="row">
          { 
            decks?.map((deck) => <DeckListItem key={`decklists-${deck.id}`} includeAuthor deck={deck} />)
          }
        </div>
        <PaginationLinks paginationMetadata={paginationMetadata} setCurrentPage={setCurrentPage} />
      </div>
    </>
  );
};

export default Decklists;
