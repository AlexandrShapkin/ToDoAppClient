import { useEffect, useState, useMemo } from "react";

import { GrClose } from "react-icons/gr";
import { FiXCircle, FiAlertCircle, FiCheckCircle } from "react-icons/fi";

export type ToastsContextValue = {
  toasts: ToastData[];
  showToast: (title: string, content: string, toastType: "error" | "alert" | "ok" | null) => void;
  removeToast: (id: number) => void;
};

export type ToastData = {
  id: number;
  title: string;
  content: string;
  autoCloseDuration: number;
  toastType: "error" | "alert" | "ok" | null;
};

type Props = {
  data: ToastData;
  closeToast: () => void;
};

const ToastIcon = {
  error: <FiXCircle className="m-auto mr-[0.5rem]" />,
  alert: <FiAlertCircle className="m-auto mr-[0.5rem]" />,
  ok: <FiCheckCircle className="m-auto mr-[0.5rem]" />,
};

const ToastColor = {
  error: "text-red-500",
  alert: "text-yellow-500",
  ok: "text-green-500"
}

function Toast({ data, closeToast }: Props) {
  const closeDurationMs = data.autoCloseDuration * 1000;
  const time = data.id + closeDurationMs;
  const [timeLost, setTimeLost] = useState(time);

  const progress = useMemo(() => {
    setTimeLost(time - Date.now());
    return timeLost;
  }, [time, timeLost]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLost(time - Date.now());
    }, 100);

    return () => clearInterval(interval);
  }, [time, timeLost]);

  return (
    <div
      role="alert"
      className="h-[6rem] w-full md:w-[25rem] mx-auto border-0 rounded-lg drop-shadow bg-white"
    >
      <div className="flex flex-col h-[5rem] w-full md:w-[24rem] m-auto">
        <div className="flex flex-row justify-between">
          <h2 className={`flex ml-[0.5rem] text-[1.5rem] ${data.toastType ? ToastColor[data.toastType] : ""}`}>
            {data.toastType ? ToastIcon[data.toastType] : null}
            {data.title}
          </h2>
          <button className="w-[2rem] h-[2rem]" onClick={closeToast}>
            <GrClose className="text-[1.5rem] m-auto" />
          </button>
        </div>
        <progress
          className="w-full h-px"
          max={closeDurationMs}
          value={progress}
        />
        <p className="mt-[0.5rem] ml-[0.5rem]">{data.content}</p>
      </div>
    </div>
  );
}

export default Toast;
