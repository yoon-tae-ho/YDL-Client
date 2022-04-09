import { createContext } from "react";

const SearchContext = createContext({
  isSearching: false,
  setIsSearching: () => {},
  text: "",
  setText: () => {},
  stopSearching: () => {},
});

export default SearchContext;
