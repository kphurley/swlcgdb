import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";

import { AuthContext } from "./AuthProvider";
import SearchTooltipContent from "./SearchTooltipContent";


const TopNavigation = () => {
  const [searchString, setSearchString] = useState("")
  const { user, onLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setSearchString(e.target.value);
  }

  const handleLogout = () => {
    onLogout();
  
    return navigate("/signIn");
  };
 
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
              <Link className="nav-link" to="decklists">Decklists</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="sets">Sets</Link>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <div className="d-flex justify-content-center align-items-center">
              <a
                className="px-2"
                data-tooltip-id="top-nav-search-tooltip"
              >
                Help
              </a>
            </div>
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
                  <li><a className="dropdown-item" onClick={handleLogout}>Logout</a></li>
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
      <Tooltip
        id="top-nav-search-tooltip"
        place="bottom"
        style={{ zIndex: "100" }}
      >
        <SearchTooltipContent />
      </Tooltip>
    </nav>
  )
}

export default TopNavigation;
