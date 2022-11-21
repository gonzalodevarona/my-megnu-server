import { Express } from "express";
import loginController from "../controllers/login.controller";
import menuController from "../controllers/Menu.controller";
import auth from "../middleware/auth";

function  routes(app: Express) {
    
    // login route
    app.post("/api/login", loginController.login);
    app.post("/api/register", loginController.createUserHandler);

    // menu routes
    app.post("/api/menu/add", menuController.createMenu);

    // this route must be erased, it was made for testing purposes
    app.post("/api/checkAuth", auth, (req, _res) => {
        console.log(req)
    });
    
}

export default routes;