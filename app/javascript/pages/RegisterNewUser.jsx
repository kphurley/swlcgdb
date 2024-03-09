import React, {useCallback, useState} from "react";
import { Link } from "react-router-dom";

import makeApiRequest from "../api/makeApiRequest";

const NewUserForm = ({ handlePayloadUpdate, onSubmit }) => {
  return (
    <>
      <h2>Register New User</h2>
      <form>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            className="form-control"
            id="username"
            placeholder="Enter username"
            onChange={(evt) => handlePayloadUpdate("username", evt.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={(evt) => handlePayloadUpdate("email", evt.target.value)}
          />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone
            else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            onChange={(evt) => handlePayloadUpdate("password", evt.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={onSubmit}>Submit</button>
      </form>
    </>
  )
}

const SuccessMessage = () => {
  return (
    <div className="alert alert-success alert-dismissible" role="alert">
      <div>Your account was created successfully!  Please click below to login:</div>
      <button type="button" className="btn btn-primary">
        <Link className="dropdown-item" to="/signIn">Login</Link>
      </button>
    </div>
  )
};

const RegisterNewUser = () => {
  const [error, setError] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [createUserPayload, setCreateUserPayload] = useState({});

  const handlePayloadUpdate = useCallback((key, value) => {
    const updatedPayload = {
      ...createUserPayload,
      [key]: value
    }

    setCreateUserPayload(updatedPayload);
  }, [createUserPayload, setCreateUserPayload]);

  const onSubmit = useCallback(async (evt) => {
    evt.preventDefault();

    const {username, email, password} = createUserPayload;
    const finalPayload = {
      username: username?.trim(),
      email: email?.trim(),
      password: password
    };

    try {
      const response = await makeApiRequest("/api/users", {
        method: 'POST',
        body: finalPayload,
      });

      if (response.error) {
        setError(response.error)
      } else {
        setUserCreated(true)
      }
    } catch (err) {
      setError(err)
    }
  }, [createUserPayload])

  return (
    <div className="container">
      {
        error && (
          <div className="alert alert-danger alert-dismissible" role="alert">
            <div>{ error }</div>
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        )
      }
      {
        userCreated
          ? <SuccessMessage />
          : <NewUserForm handlePayloadUpdate={handlePayloadUpdate} onSubmit={onSubmit} />
      }
    </div>
  );
}

export default RegisterNewUser;
