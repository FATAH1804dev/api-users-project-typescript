import express from "express";
import { userController } from "../controller/userController.ts";
import { authMiddleware } from "../middleware/authMiddleware.ts";
import { ContactController } from "../controller/contactController.ts";
import { AddressController } from "../controller/addressController.ts";

export const apiRouter = express.Router();

apiRouter.use(authMiddleware);

//users api
apiRouter.get("/api/users/current", userController.get);
apiRouter.patch("/api/users/current", userController.update);
apiRouter.delete("/api/users/current", userController.out);

//contacts api
apiRouter.post("/api/contacts", ContactController.create);
apiRouter.get("/api/contacts/:contactId", ContactController.get);
apiRouter.put("/api/contacts/:contactId", ContactController.update);
apiRouter.delete("/api/contacts/:contactId", ContactController.remove);
apiRouter.get("/api/contacts", ContactController.search);

//addresses api
apiRouter.post("/api/contacts/:contactId/addresses", AddressController.create);
apiRouter.get(
  "/api/contacts/:contactId/addresses/:addressId",
  AddressController.get,
);
apiRouter.put(
  "/api/contacts/:contactId/addresses/:addressId",
  AddressController.update,
);
apiRouter.delete(
  "/api/contacts/:contactId/addresses/:addressId",
  AddressController.remove,
);
apiRouter.get("/api/contacts/:contactId/addresses", AddressController.list);
