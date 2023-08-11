import { useState, FormEvent, useContext } from "react";

import UserController from "../../../controllers/UserController";
import UserDataDto from "../../../dtos/UserDataDto";

import { getToken } from "../../../service/TokenService";
import { ToastsContext } from "../../../App";

type Props = {
  changeToLogin: () => void;
  hideModal: () => void;
};

function RegisterForm({ changeToLogin, hideModal }: Props) {
  const toastsContext = useContext(ToastsContext);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [rpassword, setRpassword] = useState("");

  const loginHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password != rpassword) {
      toastsContext?.showToast("Ошибка регистрации", "Пароли не совпадают", "error");
      return;
    }

    const loginData: UserDataDto = {
      username: login,
      password: password,
    };
    const response = await UserController.register(loginData);
    if (response) {
      toastsContext?.showToast("Ошибка регистрации", response.message, "error");
      return;
    }
    if (getToken()) {
      toastsContext?.showToast("Успешная регистрации", "Вы зарегистрированы", "ok");
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
      <input
        className="h-[2rem] border-inherit border indent-1"
        placeholder="Пароль"
        type="password"
        value={rpassword}
        onChange={(e) => {
          setRpassword(e.target.value);
        }}
      />
      <button
        type="submit"
        className="h-[2rem] border-0 rounded-lg shadow-lg bg-dark-charcoal text-white"
      >
        Зерегистрироваться
      </button>
      <div
        className="m-auto cursor-pointer underline decoration-solid"
        onClick={changeToLogin}
      >
        Авторизация
      </div>
    </form>
  );
}

export default RegisterForm;
