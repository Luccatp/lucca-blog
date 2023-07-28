import { createContext, useContext, useState } from "react";

const FilterContext = createContext({});

export function Sidebar() {
  const [isOpen, setIsOpen] = useState();

  return <FilterContext.Provider value={{ isOpen }}></FilterContext.Provider>;
}
