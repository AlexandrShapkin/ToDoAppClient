import { useState } from "react";
import { PiUserCircle } from "react-icons/pi";

import LoginModal from "../../LoginModal/LoginModal";


function UserLabel() {
  const [showModal, setShowModal] = useState(false);
  const onClickHandler = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <div
        className="flex overflow-hidden m-[2rem] min-w-[18rem] h-[3rem] hover:scale-105 cursor-pointer"
        onClick={onClickHandler}
      >
        <div className="my-auto flex text-white font-bold">
          <PiUserCircle className="text-3xl md:text-4xl" />
          <p className="mx-2 text-xl md:text-2xl">User...</p>
        </div>
      </div>
      <LoginModal showModal={showModal} hideModal={onClickHandler} />
    </>
  );
}

export default UserLabel;
