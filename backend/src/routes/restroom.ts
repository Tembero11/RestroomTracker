import { Router, Express } from "express";
import {
  deleteController,
  getGeoJsonController,
  getSingleController,
  patchController,
  postController,
} from "../controller/restroom";
import validate from "../middleware/validate";
import { postSchema, patchSchema } from "../schema/restroom";
import expressAsyncHandler from "express-async-handler";
import verifyAuth from "../middleware/verifyAuth";

export const route = "/restroom";

const router = Router();

export function registerRoutes(app: Express) {
  router.get(`${route}.geojson`, expressAsyncHandler(getGeoJsonController));
  router.get(
    `${route}/:id`,
    verifyAuth({ requireLogin: false }),
    expressAsyncHandler(getSingleController)
  );
  router.post(
    route,
    verifyAuth(),
    validate(postSchema),
    expressAsyncHandler(postController)
  );
  router.patch(
    `${route}/:id`,
    verifyAuth({ requireLogin: true }),
    validate(patchSchema),
    patchController
  );
  router.delete(route, verifyAuth({ requireLogin: true }), deleteController);

  app.use(router);
}
