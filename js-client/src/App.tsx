import ApiAccessor from "./components/api-accessor";
import Login from "./components/login-banner";
import Profile from "./components/profile";
import RequireLogin from "./components/require-login";

function App() {
  return (
    <main className="container mt-5">
      <header className="mb-2">
        <Login />
      </header>

      <RequireLogin>
        <Profile />
        <ApiAccessor />
      </RequireLogin>
    </main>
  );
}

export default App;
