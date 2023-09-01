import { useState } from "react";

import UserContextValue from "../types/UserContextValue";
import UserDto from "../dtos/UserDto";
import UserController from "../controllers/UserController";
import { API_URL } from "../env/env";
import FetchUserService from "../service/FetchUserService";

function useUser(): [UserContextValue] {
  const [username, _setUsername] = useState("");
  const [userId, _setUserId] = useState("");
  const userController = new UserController(API_URL, FetchUserService);

  const refreshUser = async () => {
    try {
      await userController.refresh(userContextValue?.setUser);
    } catch (error) {
      return;
    }
  };

  const setUsername = (newUsername: string) => {
    _setUsername(newUsername);
  };

  const setUserId = (newUserId: string) => {
    _setUserId(newUserId);
  };

  const setUser = (newUser: UserDto) => {
    setUsername(newUser.username);
    setUserId(newUser.id);
  };

  const userContextValue: UserContextValue = {
    username: username,
    setUsername: setUsername,
    userId: userId,
    setUserId: setUserId,
    setUser: setUser,
    userController,
    refreshUser,
  };

  return [userContextValue];
}

export default useUser;
