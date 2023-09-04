import TokenRepo from "../interfaces/TokenRepo";
import Token from "../types/Token";

class SessionStorageTokenRepo implements TokenRepo {
  save(value: string): void {
    const tokenObject: Token = {
      token: value,
    };

    sessionStorage.setItem("token", JSON.stringify(tokenObject));
  }

  get(): string | null {
    const token = sessionStorage.getItem("token");
    if (!token) {
      return null;
    }
    const parsedToken: Token = JSON.parse(token);
    return parsedToken.token;
  }
}

export default new SessionStorageTokenRepo();
