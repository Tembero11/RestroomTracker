import { Router, Express } from "express";
import {
  deleteController,
  getController,
  patchController,
  postController,
} from "../controller/restroom";
import { verifyToken } from "../service/user/user";
import validate from "../middleware/validate";
import { postSchema } from "../schema/restroom";
import expressAsyncHandler from "express-async-handler";

export const route = "/restroom";

const router = Router();

export function registerRoutes(app: Express) {
  router.get(route, expressAsyncHandler(getController));
  router.post(route, verifyToken, validate(postSchema), expressAsyncHandler(postController));
  router.patch(route, verifyToken, patchController);
  router.delete(route, verifyToken, deleteController);

  app.use(router);
}
