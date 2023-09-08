import UserController from "../controllers/UserController";
import { API_URL } from "../env/env";
import FetchUserService from "../service/FetchUserService";
import SessionStorageTokenRepo from "../repositories/SessionStorageTokenRepo";
import SessionStorageUserRepo from "../repositories/SessionStorageUserRepo";
import UserContext from "../context/UserContext";

function useUser(): [UserContext] {
  const userController = new UserController(API_URL, FetchUserService, SessionStorageTokenRepo, SessionStorageUserRepo.getInstance());

  const userRepo = SessionStorageUserRepo.getInstance();

  const userContext = new UserContext(userController, userRepo);

  return [userContext];
}

export default useUser;
