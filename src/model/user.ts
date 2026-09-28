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

export type userLoginModel = {
  username: string;
  password: string;
};

export type userUpdateModel = {
  password?: string;
  name?: string;
};

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export function toUserResponse(user: User): userResponseModel {
  return {
    name: user.name,
    username: user.username,
  };
}
