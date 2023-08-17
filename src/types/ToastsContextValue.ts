import ToastData from "./ToastData";

type ToastsContextValue = {
  toasts: ToastData[];
  showToast: (title: string, content: string, toastType: "error" | "alert" | "ok" | null) => void;
  removeToast: (id: number) => void;
};

export default ToastsContextValue;