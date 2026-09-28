import {
  toUserResponse,
  type userRegisterModel,
  type userLoginModel,
  type userResponseModel,
  type userUpdateModel,
} from "../model/user";
import { Validation } from "../validation/validation";
import { UserValidation } from "../validation/user";
import { prisma } from "../application/database";
import bcrypt from "bcrypt";
import { ResponseError } from "../error/response";
import { v4 as uuid } from "uuid";
import type { User } from "../../generated/prisma/client";

export class UserService {
  static async Register(req: userRegisterModel): Promise<userResponseModel> {
    const validRequest = Validation.validate(UserValidation.register, req);

    const checkUsername = await prisma.user.count({
      where: {
        username: validRequest.username,
      },
    });

    if (checkUsername != 0) {
      throw new ResponseError(400, "Username already exist");
    }

    validRequest.password = await bcrypt.hash(validRequest.password, 10);

    const res = await prisma.user.create({
      data: validRequest,
    });

    return toUserResponse(res);
  }

  static async Login(req: userLoginModel): Promise<userResponseModel> {
    const validRequest = Validation.validate(UserValidation.login, req);

    const checkUser = await prisma.user.findUnique({
      where: {
        username: validRequest.username,
      },
    });

    if (!checkUser) {
      throw new ResponseError(401, "Username or password is wrong!");
    }

    const checkPassword = await bcrypt.compare(
      validRequest.password,
      checkUser.password,
    );

    if (!checkPassword) {
      throw new ResponseError(401, "Username or password is wrong!");
    }

    const loggedInUser = await prisma.user.update({
      where: {
        username: validRequest.username,
      },
      data: {
        token: uuid(),
      },
    });

    const response = toUserResponse(loggedInUser);
    response.token = loggedInUser.token!;

    return response;
  }
  static async Get(user: User): Promise<userResponseModel> {
    return toUserResponse(user);
  }

  static async Update(
    user: User,
    req: userUpdateModel,
  ): Promise<userResponseModel> {
    const validRequest = Validation.validate(UserValidation.update, req);

    if (validRequest.name) {
      user.name = validRequest.name;
    }
    if (validRequest.password) {
      user.password = await bcrypt.hash(validRequest.password, 10);
    }

    const data = await prisma.user.update({
      where: {
        username: user.username,
      },
      data: user,
    });
    return toUserResponse(data);
  }

  static async Out(user: User): Promise<userResponseModel> {
    const data = await prisma.user.update({
      where: {
        username: user.username,
      },
      data: {
        token: null,
      },
    });

    return toUserResponse(data);
  }
}
