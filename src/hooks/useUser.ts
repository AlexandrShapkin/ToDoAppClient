import UserContextValue from "../types/UserContextValue";
import UserController from "../controllers/UserController";
import { API_URL } from "../env/env";
import FetchUserService from "../service/FetchUserService";
import SessionStorageTokenRepo from "../repositories/SessionStorageTokenRepo";
import UserData from "../types/UserData";
import SessionStorageUserRepo from "../repositories/SessionStorageUserRepo";

function useUser(): [UserContextValue] {
  const userController = new UserController(API_URL, FetchUserService, SessionStorageTokenRepo, SessionStorageUserRepo.getInstance());

  const userRepo = SessionStorageUserRepo.getInstance();

  const refreshUser = async () => {
    try {
      await userController.refresh();
    } catch (error) {
      return;
    }
  };

  const setUsername = (newUsername: string) => {
    userRepo.setUsername(newUsername);
  };

  const setUserId = (newUserId: string) => {
    userRepo.setUserId(newUserId);
  };

  const setUser = (newUser: UserData) => {
    setUsername(newUser.username);
    setUserId(newUser._id);
  };

  const userContextValue: UserContextValue = {
    getUsername: userRepo.getUsername,
    setUsername: setUsername,
    getUserId: userRepo.getUserId,
    setUserId: setUserId,
    setUser: setUser,
    userController,
    refreshUser,
  };

  return [userContextValue];
}

export default useUser;
