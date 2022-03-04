import { createContext } from "react";

const UserContext = createContext({
  loggedIn: false,
  setLoggedIn: () => {},
  user: {},
  setUser: () => {},
});

export default UserContext;
