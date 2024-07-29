import { Router } from "express";

import CategoryRouter from "./category.js";
import UserRouter from "./user.js";

const router = Router();

router.use("/", new CategoryRouter().route);
router.use("/", new UserRouter().route);
// router.use("/", new ProductRouter().route);

export default router;
