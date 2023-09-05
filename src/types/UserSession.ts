type UserSession = {
    username: string;
    _id: string;
    authorized: boolean;
}

export function newEmptyUserSession(): UserSession {
    return {
        username: "",
        _id: "",
        authorized: false,
    }
}

export default UserSession;