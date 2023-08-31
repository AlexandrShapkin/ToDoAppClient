import { useState, FormEvent, useContext } from "react";

import UserDataDto from "../../../dtos/UserDataDto";

import { getToken } from "../../../service/TokenService";
import { ToastsContext, UserContext } from "../../../App";
import UserDto from "../../../dtos/UserDto";

type Props = {
  changeToRegister: () => void;
  hideModal: () => void;
};

function LoginForm({ changeToRegister, hideModal }: Props) {
  const toastsContext = useContext(ToastsContext);
  const userContext = useContext(UserContext);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginData: UserDataDto = {
      username: login,
      password: password,
    };
    let userData: UserDto;
    try {
      userData = await userContext!.userController.login(loginData);
    } catch (error) {
      if (error instanceof Error) {
        toastsContext?.showToast("Ошибка авторизации", error.message, "error");
      }
      return;
    }
    if (getToken()) {
      userContext?.setUser(userData);
      toastsContext?.showToast(
        "Успешная авторизция",
        "Вы успешно вошли!",
        "ok"
      );
      hideModal();
    }
  };

  return (
    <form className="flex flex-col space-y-[1.5rem]" onSubmit={loginHandler}>
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
      <div
        className="m-auto cursor-pointer underline decoration-solid"
        onClick={changeToRegister}
      >
        Регистрация
      </div>
    </form>
  );
}

export default LoginForm;
