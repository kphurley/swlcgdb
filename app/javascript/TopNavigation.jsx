import React, { useState } from "react";
import { Link } from "react-router-dom";

const TopNavigation = () => {
  const [searchString, setSearchString] = useState("")

  const handleInputChange = (e) => {
    setSearchString(e.target.value);
  }
 
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">SWLCGDB</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link">My Decks</a>
            </li>
            <li className="nav-item">
              <a className="nav-link">Decklists</a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="sets">Sets</Link>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input className="form-control me-2" onChange={ handleInputChange } type="search" placeholder="Search" aria-label="Search" />
            <Link to={`search/${searchString}`}>
              <button className="btn btn-outline-success" type="submit">Search</button>
            </Link>
          </form>
        </div>
      </div>
    </nav>
  )
}

export default TopNavigation;
