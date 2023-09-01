import AuthAccessDto from "../dtos/AuthAccessDto";
import UserDataDto from "../dtos/UserDataDto";
import ResponseError from "../types/ResponseError";

interface UserService {
  login(
    url: string,
    userDataDto: UserDataDto
  ): Promise<AuthAccessDto | ResponseError>;
  register(
    url: string,
    userDataDto: UserDataDto
  ): Promise<AuthAccessDto | ResponseError>;
  logout(url: string): Promise<string | ResponseError>;
  refresh(url: string): Promise<AuthAccessDto | ResponseError>;
}

export default UserService;
