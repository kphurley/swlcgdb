import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import makeApiRequest from "../api/makeApiRequest";

// List all of the sets.  Each one should route to /set/:id.
const Sets = () => {
  const [ sets, setSets ] = useState([])

  useEffect(() => {
    async function getCardSets() {
      const _sets = await makeApiRequest("/api/card_sets");
      setSets(_sets);
    }

    getCardSets();
  }, [])

  sets.sort((a, b) => a.number - b.number)

  return (
    <div className="container">
      <h2>Sets</h2>
      <table className="table table-sm table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
          </tr>
        </thead>
        <tbody>
          { sets.map((set) =>
              <tr key={set.id}>
                <th scope="row">{set.number}</th>
                <td><Link className="link-primary" to={`${set.id}`}>{set.name}</Link></td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  );
};

export default Sets;
