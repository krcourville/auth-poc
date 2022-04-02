import Login from "./components/login-banner";
import Profile from "./components/profile";

function App() {
  return (
    <main className="container mt-5">
      <header className="mb-2">
        <Login />
      </header>

      <Profile />
    </main>
  );
}

export default App;
