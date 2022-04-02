import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import ReactDOM from "react-dom";
import "react-loading-skeleton/dist/skeleton.css";

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-8apuqwqs.us.auth0.com"
      clientId="1W0y5jUQbXEDBdhQWlIZJov71vSbh4Ja"
      redirectUri={window.location.origin}
      scope="openid profile email phone"
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
