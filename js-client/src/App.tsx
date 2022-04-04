import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
// import RailsApiView from "./components/api-accessor";
import Login from "./components/login-banner";
import RequireLogin from "./components/require-login";
import RailsApiClient from "./services/rails-api-client";

function App() {
  const { getAccessTokenSilently, getAccessTokenWithPopup, user } = useAuth0();
  const [data, setData] = useState<any>({});

  useEffect(() => {
    (async () => {
      const railsApi = new RailsApiClient({
        jwtProvider: async () => {
          const jwt = await getAccessTokenSilently();
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
      setData({
        ...data,
        ...apiResponses,
      });
    })();
  }, [getAccessTokenSilently]);

  // const jwt = await getAccessTokenSilently();
  // const railsApiClient = new RailsApiClient();
  return (
    <main className="container mt-5">
      <header className="mb-2">
        <Login />
      </header>

      <RequireLogin>
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

export default App;
