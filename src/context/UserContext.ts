import UserController from "../controllers/UserController";
import UserRepo from "../interfaces/UserRepo";
import UserSession from "../types/UserSession";

class UserContext {
  private userController: UserController;
  private userRepo: UserRepo;

  public constructor(userController: UserController, userRepo: UserRepo) {
    this.userController = userController;
    this.userRepo = userRepo;
  }

  public setUser(username: string, userId: string, authorized: boolean) {
    this.userRepo.save({
      username: username,
      _id: userId,
      authorized: authorized,
    });
  }

  public getUser(): UserSession {
    const user = this.userRepo.get();
    if (!user) {
      throw Error("Не удалось получить данные сессии пользователя");
    }

    return user;
  }

  public setUsername(username: string) {
    this.userRepo.setUsername(username);
  }

  public getUsername(): string {
    const username = this.userRepo.getUsername();
    if (!username) {
      throw Error("Не удалось получить имя пользователя из хранилища сессии");
    }

    return username;
  }

  public setUserId(userId: string) {
    this.userRepo.setUserId(userId);
  }

  public getUserId(): string {
    const userId = this.userRepo.getUserId();
    if (!userId) {
      throw Error("Не удалось получить id пользователя из хранилища сессии");
    }

    return userId;
  }

  public setUserAuthorized(authorized: boolean) {
    this.userRepo.setAuthorized(authorized);
  }

  public isUserAuthorized(): boolean {
    const authorized = this.userRepo.isAuthorized();

    return authorized;
  }

  public async loginUser(username: string, password: string) {
    try {
      await this.userController.login({ username, password });
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
    }
  }

  public async registerUser(username: string, password: string) {
    try {
      await this.userController.register({ username, password });
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
    }
  }

  public async logoutUser() {
    try {
      await this.userController.logout();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
    }
  }

  public async refreshUser() {
    try {
      await this.userController.refresh();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
    }
  }
}

export default UserContext;
