import { useAuth0 } from "@auth0/auth0-react";
import Skeleton from "react-loading-skeleton";

const RequireLogin: React.FC = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <Skeleton count={8} />;
  }

  if (!isAuthenticated) {
    return <div className="alert alert-info">Please login to continue.</div>;
  }

  return <div>{children}</div>;
};

export default RequireLogin;
