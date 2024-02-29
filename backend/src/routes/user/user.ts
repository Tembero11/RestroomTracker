import { Router, Express } from "express";
import {
  deleteController,
  getController,
  patchController,
  postController,
} from "../../controller/user/user";
import verifyAuth from "../../middleware/verifyAuth";

export const route = "/user";

const router = Router();

export function registerRoutes(app: Express) {
  router.get(route, verifyAuth, getController);
  router.post(route, verifyAuth, postController);
  router.patch(route, verifyAuth, patchController);
  router.delete(route, verifyAuth, deleteController);

  app.use(router);
}
