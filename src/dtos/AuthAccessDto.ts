import UserDto from "./UserDataDto";

export default interface AuthAccessDto {
  accessToken: string;
  refreshToken: string;
  userDto: UserDto;
}