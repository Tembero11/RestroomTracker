import { Router, Express } from "express";
import {
  deleteController,
  getController,
  patchController,
  postController,
} from "../controller/restroom";
import validate from "../middleware/validate";
import { postSchema } from "../schema/restroom";
import expressAsyncHandler from "express-async-handler";
import verifyAuth from "../middleware/verifyAuth";

export const route = "/restroom";

const router = Router();

export function registerRoutes(app: Express) {
  router.get(route, expressAsyncHandler(getController));
  router.post(route, verifyAuth, validate(postSchema), expressAsyncHandler(postController));
  router.patch(route, verifyAuth, patchController);
  router.delete(route, verifyAuth, deleteController);

  app.use(router);
}
