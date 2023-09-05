import UserController from "../controllers/UserController";
import UserData from "./UserData";

type UserContextValue = {
  getUsername(): string | null;
  setUsername(newUsername: string): void;
  getUserId(): string | null;
  setUserId(newUserId: string): void;
  setUser(newUser: UserData): void;
  userController: UserController;
  refreshUser(): Promise<void>
}

export default UserContextValue;