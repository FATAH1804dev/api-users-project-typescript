import type { User } from "../../generated/prisma/client";

export type userResponseModel = {
  username: string;
  name: string;
  token?: string;
};

export type userRegisterModel = {
  username: string;
  password: string;
  name: string;
};

export function toUserResponse(user: User): userResponseModel {
  return {
    name: user.name,
    username: user.username,
  };
}
