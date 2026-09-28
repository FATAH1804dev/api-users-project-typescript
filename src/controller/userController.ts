import { type Request, type Response, type NextFunction } from "express";
import {
  type userRegisterModel,
  type userLoginModel,
  type userUpdateModel,
} from "../model/user";
import { UserService } from "../service/userService";

export class userController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const request: userRegisterModel = req.body as userRegisterModel;
      const result = await UserService.Register(request);
      res.status(200).json({
        data: result,
      });
    } catch (e) {
      next(e);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const request: userLoginModel = req.body as userLoginModel;
      const result = await UserService.Login(request);
      res.status(200).json({
        data: result,
      });
    } catch (e) {
      next(e);
    }
  }

  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user!;
      const result = await UserService.Get(user);
      res.status(200).json({
        data: result,
      });
    } catch (e) {
      next(e);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user!;
      const request: userUpdateModel = req.body as userUpdateModel;
      const result = await UserService.Update(user, request);
      res.status(200).json({
        data: result,
      });
    } catch (e) {
      next(e);
    }
  }
}
