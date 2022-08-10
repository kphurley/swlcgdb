import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// List all of the sets.  Each one should route to /set/:id.
const Sets = () => {
  const [ sets, setSets ] = useState([])

  useEffect(() => {
    fetch("/api/card_sets").then((data) => {
      return data.json();
    }).then((_sets) => {
      setSets(_sets);
    })
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
