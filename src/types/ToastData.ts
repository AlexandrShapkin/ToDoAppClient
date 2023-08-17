type ToastData = {
  id: number;
  title: string;
  content: string;
  autoCloseDuration: number;
  toastType: "error" | "alert" | "ok" | null;
};

export default ToastData;