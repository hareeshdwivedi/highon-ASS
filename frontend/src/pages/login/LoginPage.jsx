import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import "./login-page.css";

const LoginPage = () => {
  const { loginWithRedirect } = useAuth0();
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div className="login-main-container">
      <div className="login-signup-container">
        <div className="icon-button-container">
          <button onClick={() => loginWithRedirect()}>Click to Login</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
