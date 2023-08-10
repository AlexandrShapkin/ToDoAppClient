import { createContext } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";

import { ToastsContextValue } from "./components/UI//Toast/Toast";
import ToastContainer from "./components/ToastsContainer/ToastsContainer";
import useToasts from "./hooks/useToasts";

export const ToastsContext = createContext<ToastsContextValue | null>(null);

function App() {
  const [ toastsContextValue ] = useToasts();

  return (
    <>
      <ToastsContext.Provider
        value={toastsContextValue}
      >
        <Header />
        <MainContent />
        <ToastContainer />
      </ToastsContext.Provider>
    </>
  );
}

export default App;
