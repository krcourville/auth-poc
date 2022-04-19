import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import ReactDOM from "react-dom";
import "react-loading-skeleton/dist/skeleton.css";

import App from "./App";

const env = import.meta.env;

const auth0config = {
  domain: env.VITE_AUTH0_DOMAIN,
  clientId: env.VITE_AUTH0_CLIENT_ID,
  redirectUri: window.location.origin,
  scope: ["openid", "profile", "email", "access:private_scoped"].join(" "),
  audience: "http://rails-api",
};

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider {...auth0config}>
      <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
