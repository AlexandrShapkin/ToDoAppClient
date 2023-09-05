import { useContext, useState } from "react";
import { PiUserCircle } from "react-icons/pi";

import LoginModal from "../../AuthModal/AuthModal";
import ProfileModal from "../../ProfileModal/ProfileModal";
import { UserContext } from "../../../App";

function UserLabel() {
  const userContext = useContext(UserContext);

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
          <div className="mx-2 text-xl md:text-2xl">
            {userContext?.getUsername() ? (
              <p>{userContext.getUsername()}</p>
            ) : (
              <p>Авторизация</p>
            )}
          </div>
        </div>
      </div>
      {userContext?.getUsername() ? (
        <ProfileModal showModal={showModal} hideModal={onClickHandler} />
      ) : (
        <LoginModal showModal={showModal} hideModal={onClickHandler} />
      )}
    </>
  );
}

export default UserLabel;
