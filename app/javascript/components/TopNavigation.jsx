import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "./AuthProvider";

const TopNavigation = () => {
  const [searchString, setSearchString] = useState("")
  const { user, onLogout } = useContext(AuthContext);

  const handleInputChange = (e) => {
    setSearchString(e.target.value);
  }
 
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container star-wars-font">
        <Link className="navbar-brand" to="/">SWLCG DB</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="myDecks">My Decks</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link">Decklists</a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="sets">Sets</Link>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input className="form-control me-2 normal-font" onChange={ handleInputChange } type="search" placeholder="Search" aria-label="Search" />
            <Link to={`search/${searchString}`}>
              <button className="btn btn-outline-success" type="submit">Search</button>
            </Link>
          </form>
          <div className="dropdown padding-left-16">
            <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-person-fill" viewBox="0 0 16 16">
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
              </svg>
            </button>
            <ul className="dropdown-menu normal-font">
              {
                user ?
                <>
                  <li className="dropdown-item disabled">{`Logged in as ${user.username}`}</li>
                  <li><a className="dropdown-item" onClick={onLogout}>Logout</a></li>
                </>
                :
                <>
                  <li><Link className="dropdown-item" to="signIn">Login</Link></li>
                  <li><Link className="dropdown-item" to="register">Register</Link></li>
                </>
              }
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default TopNavigation;
