import UserSession from "../types/UserSession";
import Repo from "./Repo";

interface UserRepo extends Repo<UserSession> {
    getUsername(): string | null;
    setUsername(username: string): void;

    getUserId(): string | null;
    setUserId(userId: string): void;

    isAuthorized(): boolean;
    setAuthorized(authorized: boolean): void;
}

export default UserRepo;