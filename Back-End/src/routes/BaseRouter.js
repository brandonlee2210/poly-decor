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
    this.router.get(`/${this.routeName}`, this.controller.getAll);
    this.router.get(`/${this.routeName}/:id`, this.controller.getById);
    this.router.post(`/${this.routeName}`, this.controller.create);
    this.router.put(`/${this.routeName}/:id`, this.controller.update);
    this.router.delete(`/${this.routeName}/:id`, this.controller.delete); // Added delete route
  }

  // return route
  get route() {
    return this.router;
  }
}

export default BaseRouter;

// Example usage:
// import SomeController from 'path/to/controller';
// const someRouter = new BaseRouter(SomeController, 'someRouteName');
