import { useState, FormEvent } from "react";

import UserController from "../../../controllers/UserController";
import UserDataDto from "../../../dtos/UserDataDto";

import { getToken } from "../../../service/TokenService";

type Props = {
  changeToRegister: () => void;
  hideModal: () => void;
};

function LoginForm({changeToRegister, hideModal}: Props) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const [ errorMessage, setErrorMessage ] = useState("");

  const loginHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginData: UserDataDto = {
      username: login,
      password: password,
    };
    const error = await UserController.login(loginData);
    if (error) {
      setErrorMessage(error.message);
      return;
    }
    if (getToken()) {
      hideModal();
    }
  };

  return (
    <form className="flex flex-col space-y-[1.5rem]" onSubmit={loginHandler}>
      <label className="m-auto text-red-600">{errorMessage}</label>
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
