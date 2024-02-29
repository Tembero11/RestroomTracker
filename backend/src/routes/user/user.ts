import { Router, Express } from "express";
import {
  deleteController,
  getController,
  patchController,
  postController,
} from "../../controller/user/user";
import verifyAuth from "../../middleware/verifyAuth";
import validate from "../../middleware/validate";
import { patchSchema } from "../../schema/user";
import expressAsyncHandler from "express-async-handler";

export const route = "/user";

const router = Router();

export function registerRoutes(app: Express) {
  router.get(route, verifyAuth, getController);
  router.post(route, verifyAuth, postController);
  router.patch(
    route,
    verifyAuth,
    validate(patchSchema),
    expressAsyncHandler(patchController)
  );
  router.delete(route, verifyAuth, deleteController);

  app.use(router);
}
