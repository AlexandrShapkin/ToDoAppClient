import UserRepo from "../interfaces/UserRepo";
import UserSession, { newEmptyUserSession } from '../types/UserSession';

class SessionStorageUserRepo implements UserRepo {
    private static instance: SessionStorageUserRepo;

    private constructor() {}

    public static getInstance(): SessionStorageUserRepo {
        if (!SessionStorageUserRepo.instance) {
            SessionStorageUserRepo.instance = new SessionStorageUserRepo();
        }

        return this.instance;
    }

    public getUsername(): string | null {
        const userSession = SessionStorageUserRepo.instance.get();
        if (!userSession || !userSession.username) {
            return null;
        }

        return userSession.username;
    }

    public setUsername(username: string): void {
        let userSession = SessionStorageUserRepo.instance.get();
        if (!userSession) {
            userSession = newEmptyUserSession();
        }

        this.save({...userSession, username: username});
    }

    public getUserId(): string | null {
        const userSession = SessionStorageUserRepo.instance.get();
        if (!userSession || !userSession._id) {
            return null;
        }

        return userSession._id;
    }

    public setUserId(userId: string): void {
        let userSession = SessionStorageUserRepo.instance.get();
        if (!userSession) {
            userSession = newEmptyUserSession();
        }

        this.save({...userSession, _id: userId});
    }

    public isAuthorized(): boolean {
        const userSession = SessionStorageUserRepo.instance.get();
        if (!userSession || !userSession.authorized) {
            return false;
        }

        return userSession.authorized;
    }

    public setAuthorized(authorized: boolean): void {
        let userSession = SessionStorageUserRepo.instance.get();
        if (!userSession) {
            userSession = newEmptyUserSession();
        }

        return this.save({...userSession, authorized: authorized});
    }

    public save(value: UserSession): void {
        sessionStorage.setItem("userSession", JSON.stringify(value));
    }

    public get(): UserSession | null {
        const userSession = sessionStorage.getItem("userSession");
        if (!userSession) {
            return null;
        }

        const parsedUserSession: UserSession = JSON.parse(userSession);
        return parsedUserSession;
    }   
}

export default SessionStorageUserRepo;