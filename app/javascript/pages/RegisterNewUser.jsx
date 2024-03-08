import React, {useCallback, useState} from "react";
import {useNavigate} from 'react-router-dom';

import makeApiRequest from "../api/makeApiRequest";

const RegisterNewUser = () => {
  const [createUserPayload, setCreateUserPayload] = useState({});
  const navigate = useNavigate();

  const handlePayloadUpdate = useCallback((key, value) => {
    const updatedPayload = {
      ...createUserPayload,
      [key]: value
    }

    setCreateUserPayload(updatedPayload);
  }, [createUserPayload, setCreateUserPayload]);

  const onSubmit = useCallback(async () => {
    const {username, email, password} = createUserPayload;
    const finalPayload = {
      username: username?.trim(),
      email: email?.trim(),
      password: password
    };

    try {
      const _list = await makeApiRequest("/api/users", {
        method: 'POST',
        body: finalPayload,
      });

      navigate("/signIn");
    } catch (err) {
      console.error("ERROR!", err);
    }
  }, [createUserPayload])

  return (
    <div className="container">
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
    </div>
  );
}

export default RegisterNewUser;
