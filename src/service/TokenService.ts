import Token from "../types/Token";

export function getToken(): string | null {
  const token = sessionStorage.getItem("token");
  if (!token) {
    return null;
  }
  const parsedToken: Token = JSON.parse(token);
  return parsedToken.token;
}

export function saveToken(token: string) {
  const tokenObject: Token = {
    token: token
  }

  sessionStorage.setItem("token", JSON.stringify(tokenObject));
}

export default {
  getToken,
  saveToken
}