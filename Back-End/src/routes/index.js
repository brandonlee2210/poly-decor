import { Router } from "express";

import CategoryRouter from "./category.js";

const router = Router();

router.use("/", new CategoryRouter().route);
// router.use("/", new ProductRouter().route);

export default router;
