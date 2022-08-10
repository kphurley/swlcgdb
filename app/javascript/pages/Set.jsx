import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

  const setCards = setData.cards || []

  return (
    <div className="container">
      <table className="table table-sm table-striped">
        <thead>
          <tr>
            <th scope="col">Name</th>
          </tr>
        </thead>
        <tbody>
          { setCards.map((card) =>
              <tr key={`card-${card.id}`}>
                <td>{card.name}</td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  );
};

export default Set;
