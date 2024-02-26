import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';

import makeApiRequest from "../api/makeApiRequest";

const ResetPassword = () => {
  const [ passwordPayload, setPasswordPayload ] = useState({});
  const [ error, setError ] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function checkPasswordResetToken() {
      try {
        await makeApiRequest(`/api/password/reset/edit?token=${params.token}`);
      }
      catch(err) {
        setError(true);
      }
    };

    checkPasswordResetToken();
  }, [])

  const handlePayloadUpdate = useCallback((key, value) => {
    const updatedPayload = {
      ...passwordPayload,
      [key]: value
    }

    setPasswordPayload(updatedPayload);
  }, [passwordPayload, setPasswordPayload]);

  const onSubmit = useCallback(async (evt) => {
    evt.preventDefault();

    try {
      await makeApiRequest("/api/password/reset/edit/", {
        method: 'PATCH',
        body: {
          ...passwordPayload,
          token: params.token
        },
      });
      
      navigate("/signIn");
    } catch (err) {
      console.error("ERROR!", err);
    }
  }, [passwordPayload])

  return error ? 
  (
    <div className="container">
      <div>There was a problem updating your password.</div>
      <div>This link may have expired.</div>
      <div>Please try to change your password again.</div>
    </div>
  )
  :
  (
    <div className="container">
      <h2>Change Password</h2>
      <form>
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

export default ResetPassword;
