import RestaurantAdminService from './RestaurantAdmin.service';
import Category from "../models/Category";
import Dish from "../models/Dish";


class DishService {

    async getDishById(categoryId : string, dishId :  string) {
        try {
  
          const category = await Category.findOne({ _id: categoryId });
          
          const dish = category?.dishes.id(dishId);
          
          return dish;
          
        } catch (e: any) {
          throw new Error(e);
        }
      }

   
    async addDishToCategory(categoryId : string, dish :  typeof Dish) {
      try {

        const category = await Category.findOne({ _id: categoryId });
        
        category?.dishes.push(dish);
        category?.save();

        return await Category.findOne({ _id: categoryId });
        
    
        
      } catch (e: any) {
        throw new Error(e);
      }
    }

    // async updateDish(categoryId : string, dishId : string, dish :  typeof Dish) {
    //     try {
    //       let this.getDishById(categoryId, dishId);

    //       const category = await Category.findOne({ _id: categoryId });
          
    //       category?.dishes.push(dish);
    //       category?.save();
  
    //       if (category != null){
    //         return await RestaurantAdminService.getMenuCategoriesByAdminId(category.menu.toString());
    //       } else {
    //         return null;
    //       }
          
      
          
    //     } catch (e: any) {
    //       throw new Error(e);
    //     }
    //   }

    async deleteDishFromCategory(categoryId : string, dishId :  string) {
        try {
  
          const category = await Category.findOne({ _id: categoryId });
          
          category?.dishes.pull(dishId);
          category?.save();
  
          return await Category.findOne({ _id: categoryId });
          
      
          
        } catch (e: any) {
          throw new Error(e);
        }
      }

      




}

export default new DishService();