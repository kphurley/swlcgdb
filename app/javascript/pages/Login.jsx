import React, { useCallback, useContext, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

import { AuthContext } from "../components/AuthProvider";

const Login = () => {
  const [ createUserPayload, setCreateUserPayload ] = useState({});
  const navigate = useNavigate();
  const { onLogin } = useContext(AuthContext);

  const handlePayloadUpdate = useCallback((key, value) => {
    const updatedPayload = {
      ...createUserPayload,
      [key]: value
    }

    setCreateUserPayload(updatedPayload);
  }, [createUserPayload, setCreateUserPayload]);

  const onSubmit = useCallback(async (evt, createUserPayload) => {
    evt.preventDefault();

    const { email, password } = createUserPayload;
    const loginPayload = {
      email: email?.trim(),
      password: password
    };

    try {
      await onLogin(loginPayload);
      navigate("/sets");
    } catch(err) {
      // TODO - Better handle this!!
      console.error("ERROR!", err);
    }
  }, []);
  
  return (
    <div className="container">
      <form>
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
        <button className="btn btn-primary" onClick={(evt) => onSubmit(evt, createUserPayload)}>Submit</button>
      </form>
      <div>
        Forgot password?  <Link className="nav-link" to="/forgotPassword">Click here</Link>
      </div>
    </div>
  );
}

export default Login;
