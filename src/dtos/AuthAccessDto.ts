import UserDto from "./UserDto";

export default interface AuthAccessDto {
  accessToken: string;
  refreshToken: string;
  userDto: UserDto;
}