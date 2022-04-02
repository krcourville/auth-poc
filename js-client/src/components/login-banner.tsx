import { useAuth0 } from "@auth0/auth0-react";
import Skeleton from "react-loading-skeleton";

const LoginBanner = () => {
  const { loginWithRedirect, isAuthenticated, logout, user, isLoading } =
    useAuth0();
  if (isLoading) {
    return <Skeleton height={56} width={"25%"} />;
  }

  if (isAuthenticated && user) {
    return (
      <div>
        <img
          style={{
            maxWidth: "56px",
            maxHeight: "56px",
          }}
          className="rounded-circle img-fluid img-thumbnail"
          src={user.picture}
          alt={user.name}
        />
        <button
          className="btn btn-link"
          onClick={() => logout({ returnTo: window.location.origin })}
        >
          Log Out
        </button>
      </div>
    );
  }

  return (
    <button className="btn btn-link" onClick={() => loginWithRedirect()}>
      Log In
    </button>
  );
};
export default LoginBanner;
