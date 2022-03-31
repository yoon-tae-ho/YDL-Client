import { createContext } from "react";

const SearchContext = createContext({
  isSearching: false,
  setIsSearching: () => {},
  text: "",
  setText: () => {},
});

export default SearchContext;
