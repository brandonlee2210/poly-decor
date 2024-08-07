import { Router } from "express";
import CategoryRouter from "./category.js";
import UserRouter from "./user.js";

const router = Router();

// Middleware check quyền 
const checkAuth = (req, res, next) => {
    const user = req.user; 
    if (user && user.isAuthorized) {
        next();
    } else {
        res.status(403).json({ message: "Unauthorized" });
    }
};

const logger = (req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} - ${req.url}`);
    next();
};

// Middleware xử lý lỗi
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
};

router.use(logger);

router.use(checkAuth);

// Định nghĩa các route
router.use("/", new CategoryRouter().route);
router.use("/", new UserRouter().route);
// router.use("/", new ProductRouter().route);

router.use(errorHandler);

export default router;
