import Menu from "../models/Menu";
//import RestaurantAdminService from "./RestaurantAdmin.service";

class MenuService {

    async createMenu(input: typeof Menu) {
      try {
        
        //RestaurantAdminService.findRestaurantAdminById(input.restaurantAdminId as string)
        const newMenu = await Menu.create(input);
        return newMenu.toJSON();
      } catch (e: any) {
        throw new Error(e);
      }
    }

}

export default new MenuService();