import UserController from "../controllers/UserController.js";
import BaseRouter from "./BaseRouter.js";

 class UserRouter extends BaseRouter {
  constructor() {

    super(new UserController(), "users");
  }
}
export default UserRouter;