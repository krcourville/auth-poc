import { Auth0ContextInterface, useAuth0, User } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import Login from "./components/login-banner";
import RequireLogin from "./components/require-login";
import RailsApiClient from "./services/rails-api-client";

function App() {
  const auth0 = useAuth0();
  const { user } = auth0;
  const [data, setData] = useState<any>({});

  const handleAuthorize = () => {
    authenticate(auth0, data).then(setData);
  };

  useEffect(handleAuthorize, []);

  return (
    <main className="container mt-5">
      <header className="mb-2">
        <Login />
      </header>

      <RequireLogin>
        <div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleAuthorize}
          >
            Re-Authorize
          </button>
        </div>
        <section>
          <h3>ID Token Data</h3>
          <pre>{JSON.stringify(user, null, 2)}</pre>

          <h3>Api Data</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </section>
      </RequireLogin>
    </main>
  );
}

async function authenticate(
  auth0: Auth0ContextInterface<User>,
  data: any
): Promise<any> {
  const railsApi = new RailsApiClient({
    jwtProvider: async () => {
      const jwt = await auth0.getAccessTokenSilently();
      console.log("JWT", jwt);
      return jwt;
    },
  });

  const [publicRes, privateRes] = await Promise.all([
    railsApi.getPublic(),
    railsApi.getPrivate(),
  ]);
  const apiResponses = {
    publicRes,
    privateRes,
  };
  return {
    ...data,
    ...apiResponses,
  };
}

export default App;
