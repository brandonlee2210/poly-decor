import { Router } from "express";

// Giả sử bạn có các middleware này
import requireAuth from "../middlewares/requireAuth.js";
import checkAdmin from "../middlewares/checkAdmin.js";
import checkUser from "../middlewares/checkUser.js";

class BaseRouter {
  constructor(controller, routeName) {
    this.router = Router();
    this.controller = controller;
    this.routeName = routeName;
    this.initRoutes();
  }

  initRoutes() {
    // Khởi tạo các routes cơ bản với các middleware
    this.router.get(`/${this.routeName}`, requireAuth, this.controller.getAll.bind(this.controller));
    this.router.get(`/${this.routeName}/:id`, requireAuth, this.controller.getById.bind(this.controller));
    this.router.post(`/${this.routeName}`, requireAuth, checkAdmin, this.controller.create.bind(this.controller));
    this.router.put(`/${this.routeName}/:id`, requireAuth, checkAdmin, this.controller.update.bind(this.controller));
    this.router.delete(`/${this.routeName}/:id`, requireAuth, checkAdmin, this.controller.delete.bind(this.controller));
    this.router.delete(`/${this.routeName}`, requireAuth, checkAdmin, this.controller.deleteAll.bind(this.controller));
  }

  // return router
  get route() {
    return this.router;
  }

  // add custom router with optional middlewares
  addRouter(method, path, handler, ...middlewares) {
    this.router[method](path, ...middlewares, handler);
  }

  getController() {
    return this.controller;
  }
}

export default BaseRouter;
