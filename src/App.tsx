import { createContext, useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";

import { ToastsContextValue } from "./components/UI//Toast/Toast";
import ToastContainer from "./components/ToastsContainer/ToastsContainer";
import useToasts from "./hooks/useToasts";
import useUser from "./hooks/useUser";

import UserContextValue from "./types/UserContextValue";
import UserController from "./controllers/UserController";

export const ToastsContext = createContext<ToastsContextValue | null>(null);

export const UserContext = createContext<UserContextValue | null>(null);

function App() {
  const [userContextValue] = useUser();
  const [toastsContextValue] = useToasts();

  const refresh = async () => {
    try {
      await UserController.refresh(userContextValue?.setUser);
    } catch (error) {
      return;
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  return (
    <>
      <UserContext.Provider value={userContextValue}>
        <ToastsContext.Provider value={toastsContextValue}>
          <Header />
          <MainContent />
          <ToastContainer />
        </ToastsContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
