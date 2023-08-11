import { useState } from "react";
import { ToastData, ToastsContextValue } from "../components/UI/Toast/Toast";

function useToasts(autoCloseDurationInit: number = 5, autoCloseInit: boolean = true): [ToastsContextValue] {
  const [toasts, setToasts] = useState<Array<ToastData>>([]);
  const [autoClose] = useState(autoCloseInit);
  const [autoCloseDuration] = useState(autoCloseDurationInit);

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

  return [toastsContextValue];
}

export default useToasts;