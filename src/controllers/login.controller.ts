import { Request, Response } from "express";
import RestaurantAdminService from "../services/RestaurantAdmin.service";
import jwt from 'jsonwebtoken';
import {comparePassword} from "../utils/encrypt";



class LoginController {



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