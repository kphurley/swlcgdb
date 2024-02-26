import React, { useCallback, useState } from "react";
import { useNavigate } from 'react-router-dom';

import makeApiRequest from "../api/makeApiRequest";

const ForgotPassword = () => {
  const [ createForgotPasswordPayload, setCreateForgotPasswordPayload ] = useState({});
  const navigate = useNavigate();

  const handlePayloadUpdate = useCallback((key, value) => {
    const updatedPayload = {
      ...createForgotPasswordPayload,
      [key]: value
    }

    setCreateForgotPasswordPayload(updatedPayload);
  }, [createForgotPasswordPayload, setCreateForgotPasswordPayload]);

  const onSubmit = useCallback(async (evt, createForgotPasswordPayload) => {
    evt.preventDefault();

    const { email } = createForgotPasswordPayload;
    const trimmedCreatePasswordPayload = {
      email: email?.trim()
    };

    try {
      await makeApiRequest(`/api/password/reset`, {
        method: 'POST',
        body: trimmedCreatePasswordPayload,
      });

      navigate("/signIn");
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
        <button className="btn btn-primary" onClick={(evt) => onSubmit(evt, createForgotPasswordPayload)}>Submit</button>
      </form>
    </div>
  );
}

export default ForgotPassword;