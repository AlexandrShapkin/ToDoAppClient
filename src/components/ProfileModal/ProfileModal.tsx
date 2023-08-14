import { PiUserCircle } from "react-icons/pi";

import { useContext } from "react";
import ModalContainer from "../UI/ModalContainer/ModalContainer";
import { ToastsContext, UserContext } from "../../App";
import UserController from "../../controllers/UserController";

type Props = {
  showModal: boolean;
  hideModal: () => void;
};

function ProfileModal({ showModal, hideModal }: Props) {
  const userContext = useContext(UserContext);
  const toastsContext = useContext(ToastsContext);

  const logout = () => {
    try {
      UserController.logout();
    } catch (error) {
      if (error instanceof Error) {
        toastsContext?.showToast("Ошибка выхода", error.message, "error");
      }
      return;
    }
    userContext?.setUsername("");
    userContext?.setUserId("");
  };

  return (
    <ModalContainer showModal={showModal} hideModal={hideModal} title="Профиль">
      <div className="flex flex-col w-full">
        <PiUserCircle className="m-auto text-6xl" />
        <p className="m-auto text-3xl">{userContext?.username}</p>
        <button
          className="h-[2rem] border-0 rounded-lg shadow-lg bg-dark-charcoal text-white mt-[1rem]"
          onClick={logout}
        >
          Выйти
        </button>
      </div>
    </ModalContainer>
  );
}

export default ProfileModal;
