import { FormEvent, useState } from "react";
import ModalContainer from "../UI/ModalContainer/ModalContainer";
import UserController from "../../controllers/UserController";
import UserDataDto from "../../dtos/UserDataDto";

type Props = {
  showModal: boolean;
  hideModal: () => void;
};

function LoginModal({ showModal, hideModal }: Props) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginData: UserDataDto = {
      username: login,
      password: password,
    };
    await UserController.login(loginData);
    if (localStorage.getItem("accessToken")) {
      hideModal();
    }
  };

  return (
    <ModalContainer
      showModal={showModal}
      hideModal={hideModal}
      title="Авторизация"
    >
      <form
        className="flex flex-col space-y-[1.5rem]"
        onSubmit={loginHandler}
      >
        <input
          className="h-[2rem] border-inherit border indent-1"
          placeholder="Логин"
          type="text"
          value={login}
          onChange={(e) => {
            setLogin(e.target.value);
          }}
        />
        <input
          className="h-[2rem] border-inherit border indent-1"
          placeholder="Пароль"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          type="submit"
          className="h-[2rem] border-0 rounded-lg shadow-lg bg-dark-charcoal text-white"
        >
          Авторизоваться
        </button>
      </form>
    </ModalContainer>
  );
}

export default LoginModal;
