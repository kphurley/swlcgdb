import React, { useCallback, useContext, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

import { AuthContext } from "../components/AuthProvider";

const Login = () => {
  const [ createUserPayload, setCreateUserPayload ] = useState({});
  const [ error, setError ] = useState(null);
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

    // We don't try-catch here because any big blow-ups are now caught by the error boundary
    const loginResponse = await onLogin(loginPayload);

    if (!loginResponse.error) {
      navigate("/myDecks");
    } else {
      setError(loginResponse.error)
    }
  }, []);
  
  return (
    <div className="container mt-5 pb-5">
      <div className="row d-flex justify-content-center">
        <div className="col-md-6 col-md-push-3">
          {
            error && <div className="alert alert-danger" role="alert">{ `Error logging in: ${error}` }</div>
          }
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
            <div className="form-group">
              <button className="btn btn-primary" onClick={(evt) => onSubmit(evt, createUserPayload)}>Submit</button>
            </div>
            <div className="form-group">
              <div className="d-flex">
                <span>Forgot password? &nbsp; &nbsp;</span>
                <Link to="/forgotPassword">Click here</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
