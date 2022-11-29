import { Request, Response } from "express";
import RestaurantAdminService from "../services/RestaurantAdmin.service";
import { encrypt } from "../utils/encrypt";
import LoginService from "../services/Login.service";



class RestaurantAdminController {


    async createRestaurantAdmin(req: Request, res: Response) {
        try {
          const userExist = await RestaurantAdminService.findRestaurantAdminByEmail(req.body.email);
          if (userExist !== null) {
            return res.status(409).send("Restaurant Admin exist");
          }
          const ogPassword = req.body.password;

          req.body.password = await encrypt(req.body.password)
          
          await RestaurantAdminService.createRestaurantAdmin(req.body);

          const user = await LoginService.login(req.body.email, ogPassword);
          
          return res.send(user);
        } catch (e: any) {
          console.log(e)
  
          return res.status(409).send(e.message);
        }
    }

    async updateRestaurantAdmin(req: Request, res: Response) {
        try {
          const restaurantAdminExist = await RestaurantAdminService.findRestaurantAdminById(req.body.restaurantAdminId);
          if (restaurantAdminExist == null) {
            return res.status(409).send("Restaurant Admin does not exist");
          }
    
          if (req.body.password) {
            req.body.password = await encrypt(req.body.password);
          }
    
          const user = await RestaurantAdminService.updateRestaurantAdmin(req.body.restaurantAdminId, req.body.restaurantAdmin);
          return res.send(user);
        } catch (e: any) {
          
          return res.status(409).send(e.message);
        }
    }

    async getRestaurantAdmin(req: Request, res: Response) {
        try {
            const restaurantAdminExist = await RestaurantAdminService.findRestaurantAdminById(req.body.restaurantAdminId);
            if (restaurantAdminExist == null) {
                return res.status(409).send("Restaurant Admin does not exist");
            }
            restaurantAdminExist.password = "";
            return res.send(restaurantAdminExist);
        } catch (e: any) {

            return res.status(409).send(e.message);
        }
    }

    async getRestaurantAdminCategoriesById(req: Request, res: Response) {
      try {

          const restaurantAdminExist = await RestaurantAdminService.findRestaurantAdminById(req.params.restaurantAdminId);
          if (restaurantAdminExist == null) {
              return res.status(409).send("Restaurant Admin does not exist");
          }
          
          const menu = await RestaurantAdminService.getMenuCategoriesByAdminId(req.params.restaurantAdminId);

          return res.send(menu);
      } catch (e: any) {

          return res.status(409).send(e.message);
      }
  }


    async deleteRestaurantAdmin(req: Request, res: Response) {
      try {
        const restaurantAdminExist = await RestaurantAdminService.findRestaurantAdminById(req.body.restaurantAdminId);
        if (restaurantAdminExist == null) {
          return res.status(409).send("Restaurant Admin does not exist");
        }
        let restaurantAdmin = await RestaurantAdminService.deleteRestaurantAdmin(req.body.restaurantAdminId);
        return res.send(restaurantAdmin);
      } catch (e: any) {
  
        return res.status(409).send(e.message);
      }
    }

}

export default new RestaurantAdminController();