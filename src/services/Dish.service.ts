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

        return category?.save();
        
    
        
      } catch (e: any) {
        throw new Error(e);
      }
    }

    async updateDish(categoryId : string, dishId : string, dish :  typeof Dish) {
      try {
      
        
        const aux = await Category.findOneAndUpdate(
          { "_id":  categoryId, "dishes._id": dishId },
          { 
              "$set": {
                  "dishes.$": dish
              }
          },
          {new : true});

          return aux;

         
              
        
      } catch (e: any) {
        throw new Error(e);
      }
    }

    async deleteDishFromCategory(categoryId : string, dishId :  string) {
        try {
  
          const category = await Category.findOne({ _id: categoryId });
          
          await category?.dishes.pull(dishId);
          return category?.save();
  
          
          
      
          
        } catch (e: any) {
          throw new Error(e);
        }
      }

      




}

export default new DishService();