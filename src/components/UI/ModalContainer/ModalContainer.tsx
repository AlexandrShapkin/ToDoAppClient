import { ReactNode } from "react";
import {GrClose} from "react-icons/gr";

type Props = {
  showModal?: boolean;
  hideModal?: () => void;
  children?: ReactNode;
  title?: string;
};

function ModalContainer({ showModal, hideModal, children, title }: Props) {
  return (
    <div
      className={`justify-center items-center flex overflow-x-hidden backdrop-blur-sm overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ease-out duration-200 md:duration-300 ${
        showModal ? "translate-y-0" : "-translate-y-[100vh]"
      }`}
      onClick={hideModal}
    >
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        {/*content*/}
        <div
          className="border-0 rounded-lg drop-shadow-2xl relative flex flex-col w-full bg-white outline-none focus:outline-none"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex w-full h-[2rem] justify-between">
            <h1 className="h-[2rem] text-[1.5rem] ml-[0.5rem]">{title}</h1>
            <button className="w-[2rem] h-[2rem]" onClick={hideModal}><GrClose className="text-[1.5rem] m-auto"/></button>
          </div>
          <hr className="mt-[0.5rem]"/>
          <div className="flex p-[1.5rem]">
          {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalContainer;
