import { Express } from "express";
import loginController from "../controllers/login.controller";

function  routes(app: Express) {
    
    app.post("/api/register", loginController.createUserHandler);

    
}

export default routes;