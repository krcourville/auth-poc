import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import ReactDOM from "react-dom";
import "react-loading-skeleton/dist/skeleton.css";

import App from "./App";

const env = import.meta.env;

const auth0 = {
  domain: env.VITE_AUTH0_DOMAIN,
  clientId: env.VITE_AUTH0_CLIENT_ID,
};

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={auth0.domain}
      clientId={auth0.clientId}
      redirectUri={window.location.origin}
      scope="openid profile email"
      audience="http://rails-api"
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
