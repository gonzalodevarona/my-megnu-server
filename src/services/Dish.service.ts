import RestaurantAdminService from './RestaurantAdmin.service';
import Category from "../models/Category";
import Dish from "../models/Dish";


class DishService {

   
    async addDishToCategory(categoryId : string, dish :  typeof Dish) {
      try {

        const category = await Category.findOne({ _id: categoryId });
        
        category?.dishes.push(dish);
        category?.save();

        if (category != null){
          return await RestaurantAdminService.getMenuCategoriesByAdminId(category.menu.toString());
        } else {
          return null;
        }
        
    
        
      } catch (e: any) {
        throw new Error(e);
      }
    }




}

export default new DishService();