import { useContext } from "react";
import Toast from "../UI/Toast/Toast";

import { ToastsContext } from "../../App";

function ToastsContainer() {
  const toastsContext = useContext(ToastsContext);

  return (
      <div className="absolute bottom-0 md:right-0 overflow-auto">
        <div className="flex flex-col space-y-[1rem] max-h-[21rem] w-[100vw] md:w-[25rem] md:m-[1rem]">
          {toastsContext?.toasts.map((toast, index) => (
            <Toast
              data={toast}
              closeToast={() => toastsContext?.removeToast(toast.id)}
              key={index + toast.id}
            />
          ))}
        </div>
      </div>
  );
}

export default ToastsContainer;
