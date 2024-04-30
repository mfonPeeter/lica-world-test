"use client";

import { createContext, useState } from "react";

interface AppContextInterface {
  showSidebar: boolean;
  showSidebarHandler: () => void;
}

export const AppContext = createContext({
  showSidebar: false,
  showSidebarHandler: () => {},
});

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showSidebar, setShowSidebar] = useState(false);

  const showSidebarHandler = () => {
    setShowSidebar((preVal) => !preVal);
  };

  const contextValue: AppContextInterface = {
    showSidebar,
    showSidebarHandler,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}
