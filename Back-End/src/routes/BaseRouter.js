import { Router } from "express";

class BaseRouter {
  constructor(controller, routeName) {
    this.router = Router();
    this.controller = controller;
    this.routeName = routeName;
    this.initRoutes();
  }

  initRoutes() {
    // Khởi tạo các routes cơ bản
    this.router.get(`/${this.routeName}`, this.controller.getAll.bind(this.controller));
    this.router.get(`/${this.routeName}/:id`, this.controller.getById.bind(this.controller));
    this.router.post(`/${this.routeName}`, this.controller.create.bind(this.controller));
    this.router.put(`/${this.routeName}/:id`, this.controller.update.bind(this.controller));
    this.router.delete(`/${this.routeName}/:id`, this.controller.delete.bind(this.controller));
    this.router.delete(`/${this.routeName}`, this.controller.deleteAll.bind(this.controller));
  }

  // return router
  get route() {
    return this.router;
  }

  // add custom router
  addRouter(method, path, handler) {
    this.router[method](path, handler);
  }

  getController() {
    return this.controller;
  }

  // get controller() {
  //   return this.controller;
  // }

  // set controller(controller) {
  //   this.controller = controller;
  // }
}

export default BaseRouter;
