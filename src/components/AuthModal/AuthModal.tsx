import { useState } from "react";

import ModalContainer from "../UI/ModalContainer/ModalContainer";
import LoginForm from "../UI/LoginForm/LoginForm";
import RegisterForm from "../UI/RegisterFrom/RegisterForm";

type Props = {
  showModal: boolean;
  hideModal: () => void;
};

function AuthModal({ showModal, hideModal }: Props) {
  const [ mode, setMode ] = useState(true);

  const changeMode = () => {
    setMode(!mode);
  }

  return (
    <ModalContainer
      showModal={showModal}
      hideModal={hideModal}
      title={mode ? "Авторизация" : "Регистрация"}
    >
      {mode ? <LoginForm hideModal={hideModal} changeToRegister={changeMode} /> : <RegisterForm hideModal={hideModal} changeToLogin={changeMode} />}
    </ModalContainer>
  );
}

export default AuthModal;
