import {
  toUserResponse,
  type userRegisterModel,
  type userResponseModel,
} from "../model/user";
import { Validation } from "../validation/validation";
import { UserValidation } from "../validation/user";
import { prisma } from "../application/database";
import bcrypt from "bcrypt";
import { ResponseError } from "../error/response";

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
}
