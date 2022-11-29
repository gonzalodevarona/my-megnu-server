import RestaurantAdminService from "./RestaurantAdmin.service";
import jwt from 'jsonwebtoken';
import {comparePassword} from "../utils/encrypt";



class LoginService {

  async login (email: string, password: string) {
    try{

      let user = await RestaurantAdminService.findRestaurantAdminByEmail( email )
      

      let passwordCorrect = false;
      
      if(user !== null){
        passwordCorrect = await comparePassword(password, user.password);
      }      

      if (!(user && passwordCorrect)) {
        return null;
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
      user.password = "";

      return {
        user,
        token
      }

  } catch (e: any) {
    throw new Error(e);
  }



  }


}

export default new LoginService();