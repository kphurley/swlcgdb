import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import _ from "lodash";

import GunIcon from "../icons/gun_icon.svg";
import GunIconWhite from "../icons/gun_icon_edge_border.svg";

// List all of the cards in a set.
const Set = () => {
  const [ setData, setSetData ] = useState({})
  const params = useParams();

  useEffect(() => {
    fetch(`/api/card_sets/${params.id}`).then((data) => {
      return data.json();
    }).then((_set) => {
      setSetData(_set);
    })
  }, [])

  const setCardBlocks = setData.card_blocks || []
  setCardBlocks.sort((a, b) => a.block - b.block)

  const setCards = setData.cards || []
  const cardsByBlock = _.groupBy(setCards, 'block')

  return (
    <div className="container">
      <table className="table table-sm">
        <thead>
          <tr>
            <th scope="col">Block #</th>
            <th>Name</th>
            <th>Type</th>
            <th>Cost</th>
            <th>Icons</th>
            <th>Force</th>
            <th>Damage Cap.</th>
            <th>Resources</th>
            <th>{"  "}</th>
          </tr>
        </thead>
        <tbody>
          { _.map(cardsByBlock, (cards, blockNum) => {
              const objectiveCard = cards.filter((c) => c.card_type === "Objective")[0];
              const nonObjectiveCards = cards
                                        .filter((c) => c.card_type !== "Objective")
                                        .sort((a, b) => a.block_number - b.block_number);

              return (
                <>
                  <tr key={`card-${blockNum}`}>
                    <td>{objectiveCard.block_number}</td>
                    <td>{objectiveCard.name}</td>
                    <td>{objectiveCard.card_type}</td>
                    <td>{objectiveCard.cost}</td>
                    <td><GunIcon /><GunIconWhite /></td>
                    <td>{objectiveCard.force}</td>
                    <td>{objectiveCard.damage_capacity}</td>
                    <td>{objectiveCard.resources}</td>
                    <td>
                      <i
                        className="bi bi-chevron-right collapsed"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse-${blockNum}`}
                        aria-expanded="false"
                        aria-controls={`collapse-${blockNum}`}>
                      </i>
                    </td>
                  </tr>
                  {
                    nonObjectiveCards.map((card) =>
                      <tr className="collapse" id={`collapse-${blockNum}`}>
                        <td>{card.block_number}</td>
                        <td>&nbsp;&nbsp;{card.name}</td>
                        <td>{card.card_type}</td>
                        <td>{card.cost}</td>
                        <td><GunIcon /><GunIconWhite /></td>
                        <td>{card.force}</td>
                        <td>{card.damage_capacity}</td>
                        <td>{card.resources}</td>
                      </tr>
                    )
                  }
                </>
              )
            })
          }
        </tbody>
      </table>
    </div>
  );
};

export default Set;
