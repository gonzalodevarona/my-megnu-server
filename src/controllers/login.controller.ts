import { Request, Response } from "express";
import RestaurantAdminService from "../services/RestaurantAdmin.service";
import bcrypt from "bcrypt";



class LoginController {

    async createUserHandler(req: Request, res: Response) {
        try {
          const userExist = await RestaurantAdminService.findRestaurantAdminByEmail(req.body.email);
          if (userExist !== null) {
            return res.status(409).send("user exist");
          }
    
          req.body.password = await bcrypt.hash(req.body.password, 10);
          const user = await RestaurantAdminService.createRestaurantAdmin(req.body);
          return res.send(user);
        } catch (e: any) {
          console.log(e)
    
          return res.status(409).send(e.message);
        }
      }


}

export default new LoginController();