import { useState } from "react";

import UserContextValue from "../types/UserContextValue";
import UserDto from "../dtos/UserDto";

function useUser(): [ UserContextValue ] {
  const [ username, _setUsername ] = useState("");
  const [ userId, _setUserId ] = useState("");

  const setUsername = (newUsername: string) => {
    _setUsername(newUsername);
  }

  const setUserId = (newUserId: string) => {
    _setUserId(newUserId);
  }

  const setUser = (newUser: UserDto) => {
    setUsername(newUser.username);
    setUserId(newUser.id);
  }

  const userContextValue: UserContextValue = {
    username: username,
    setUsername: setUsername,
    userId: userId,
    setUserId: setUserId,
    setUser: setUser,
  }

  return [ userContextValue ];
}

export default useUser;