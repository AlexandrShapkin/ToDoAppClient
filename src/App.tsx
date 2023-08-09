import { createContext, useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";

import { ToastData } from "./components/UI//Toast/Toast";
import ToastContainer from "./components/ToastsContainer/ToastsContainer";

type ToastsContextValue = {
  toasts: ToastData[];
  showToast: (title: string, content: string, toastType: "error" | "alert" | "ok" | null) => void;
  removeToast: (id: number) => void;
};

export const ToastsContext = createContext<ToastsContextValue | null>(null);

function App() {
  const [toasts, setToasts] = useState<Array<ToastData>>([]);
  const [autoClose] = useState(true);
  const [autoCloseDuration] = useState(10);

  const showToast = (title: string, content: string, toastType: "error" | "alert" | "ok" | null = null) => {
    const newToast: ToastData = {
      id: Date.now(),
      title: title,
      content: content,
      autoCloseDuration: autoCloseDuration,
      toastType: toastType
    };

    setToasts((prevToasts) => [...prevToasts, newToast]);

    if (autoClose) {
      setTimeout(() => {
        removeToast(newToast.id);
      }, autoCloseDuration * 1000);
    }
  };

  const removeToast = (id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id != id));
  };

  const toastsContextValue: ToastsContextValue = {
    toasts: toasts,
    showToast: showToast,
    removeToast: removeToast,
  };

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
