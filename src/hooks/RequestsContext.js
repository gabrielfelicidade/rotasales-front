import { createContext, useContext, useState } from "react";

export const RequestsContext = createContext({
  activeRequests: 0,
  newRequest: null,
  endRequest: null
});

export function RequestsProvider({ children }) {
  const [activeRequests, setActiveRequests] = useState(0);
  const newRequest = () => { setActiveRequests(activeRequests + 1); if (activeRequests > 0) { let root = document.getElementById('root'); root.style.pointerEvents = 'none'; root.style.userSelect = 'none'; } }
  const endRequest = () => { setActiveRequests(Math.max(activeRequests - 1, 0)); if (activeRequests === 0) { let root = document.getElementById('root'); root.style.pointerEvents = 'auto'; root.style.userSelect = 'auto'; } };
  const value = { activeRequests, newRequest, endRequest };
  return (
    <RequestsContext.Provider value={value}>
      {children}
    </RequestsContext.Provider>
  );
}

export function useRequests() {
  const context = useContext(RequestsContext);
  if (!context) {
    throw new Error("useLoading must be used within LoadingProvider");
  }
  return context;
}