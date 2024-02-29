import { Router } from "express";
import { deleteController, getController, patchController, postController } from "../../controller/user/user";

export const route = "/account";

const router = Router();

router.get(route, getController);
router.post(route, postController);
router.patch(route, patchController);
router.delete(route, deleteController);

export default router;