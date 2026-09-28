import {
  toUserResponse,
  type userRegisterModel,
  type userLoginModel,
  type userResponseModel,
} from "../model/user";
import { Validation } from "../validation/validation";
import { UserValidation } from "../validation/user";
import { prisma } from "../application/database";
import bcrypt from "bcrypt";
import { ResponseError } from "../error/response";
import { v4 as uuid } from "uuid";

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
}
