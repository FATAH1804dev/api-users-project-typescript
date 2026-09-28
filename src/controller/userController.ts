import { type Request, type Response, type NextFunction } from "express";
import { type userRegisterModel } from "../model/user";
import { UserService } from "../service/userService";

export class userController {
  static async register(req: Request, res: Response, next: NextFunction) {
    const request: userRegisterModel = req.body as userRegisterModel;
    const result = await UserService.Register(request);
    try {
      res.status(200).json({
        data: request,
      });
    } catch (e) {
      next(e);
    }
  }
}
