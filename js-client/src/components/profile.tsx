import { useAuth0 } from "@auth0/auth0-react";
import RequireLogin from "./require-login";

const Profile = () => {
  const { user } = useAuth0();

  return (
    <RequireLogin>
      <label htmlFor="">Profile Data</label>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </RequireLogin>
  );
};

export default Profile;
