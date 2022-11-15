import { Request, Response } from "express";
import RestaurantAdminService from "../services/RestaurantAdmin.service";
import jwt from 'jsonwebtoken';
import {encrypt, comparePassword} from "../utils/encrypt";



class LoginController {



    async createUserHandler(req: Request, res: Response) {
      try {
        const userExist = await RestaurantAdminService.findRestaurantAdminByEmail(req.body.email);
        if (userExist !== null) {
          return res.status(409).send("user exist");
        }

        req.body.password = await encrypt(req.body.password)

        const user = await RestaurantAdminService.createRestaurantAdmin(req.body);
        return res.send(user);
      } catch (e: any) {
        console.log(e)

        return res.status(409).send(e.message);
      }
    }

    async login (req: Request, res: Response) {
      const { body } = req;
      const { email, password } = body;

      const user = await RestaurantAdminService.findRestaurantAdminByEmail( email )
      

      let passwordCorrect = false;
      
      if(user !== null){
        passwordCorrect = await comparePassword(password, user.password);
      }      

      if (!(user && passwordCorrect)) {
        return res.status(401).json({ error: 'invalid user or password' });
      }


      const userForToken = {
        id: user._id,
        restaurantName: user.restaurantName
      }
    
      const token = jwt.sign(
        userForToken,
        process.env.SECRET_TOKEN as jwt.Secret,
        {
          expiresIn: 60 * 60  // Expira en una hora
        }
      )
    
      return res.status(200).send({
        id: user._id,
        name: user.name,
        lastName: user.name,
        restaurantName: user.restaurantName,
        token
      })



    }


}

export default new LoginController();