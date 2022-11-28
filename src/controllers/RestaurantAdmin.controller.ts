import { Request, Response } from "express";
import RestaurantAdminService from "../services/RestaurantAdmin.service";
import { encrypt } from "../utils/encrypt";



class RestaurantAdminController {


    async createRestaurantAdmin(req: Request, res: Response) {
        try {
          const userExist = await RestaurantAdminService.findRestaurantAdminByEmail(req.body.email);
          if (userExist !== null) {
            return res.status(409).send("Restaurant Admin exist");
          }
  
          req.body.password = await encrypt(req.body.password)
  
          const user = await RestaurantAdminService.createRestaurantAdmin(req.body);
          return res.send(user);
        } catch (e: any) {
          console.log(e)
  
          return res.status(409).send(e.message);
        }
    }

    async updateRestaurantAdmin(req: Request, res: Response) {
        try {
          const restaurantAdminExist = await RestaurantAdminService.findRestaurantAdminById(req.body.id);
          if (restaurantAdminExist == null) {
            return res.status(409).send("Restaurant Admin does not exist");
          }
    
          if (req.body.password) {
            req.body.password = await encrypt(req.body.password);
          }
    
          const user = await RestaurantAdminService.updateRestaurantAdmin(req.body.id, req.body.restaurantAdmin);
          return res.send(user);
        } catch (e: any) {
          
          return res.status(409).send(e.message);
        }
    }

    async getRestaurantAdmin(req: Request, res: Response) {
        try {
            const restaurantAdminExist = await RestaurantAdminService.findRestaurantAdminById(req.body.id);
            if (restaurantAdminExist == null) {
                return res.status(409).send("Restaurant Admin does not exist");
            }
            restaurantAdminExist.password = "";
            return res.send(restaurantAdminExist);
        } catch (e: any) {

            return res.status(409).send(e.message);
        }
    }


    async deleteRestaurantAdmin(req: Request, res: Response) {
      try {
        const restaurantAdminExist = await RestaurantAdminService.findRestaurantAdminById(req.body.id);
        if (restaurantAdminExist == null) {
          return res.status(409).send("Restaurant Admin does not exist");
        }
        let restaurantAdmin = await RestaurantAdminService.deleteRestaurantAdmin(req.body.id);
        return res.send(restaurantAdmin);
      } catch (e: any) {
  
        return res.status(409).send(e.message);
      }
    }

}

export default new RestaurantAdminController();