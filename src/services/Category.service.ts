import RestaurantAdmin from "../models/RestaurantAdmin";
import RestaurantAdminService from './RestaurantAdmin.service';
import Category from "../models/Category";
import mongodb = require("mongodb");
const ObjectId = mongodb.ObjectID;

class CategoryService {

    async createCategory(idRestaurantAdmin : string, input : typeof Category) {
        try {

          let foundRestaurantAdmin = await RestaurantAdminService.findRestaurantAdminById(idRestaurantAdmin);
          if (foundRestaurantAdmin == null) {
            return foundRestaurantAdmin;
          }

          const newCategory = await Category.create(input);
          
          foundRestaurantAdmin.menu.push(newCategory._id);
          foundRestaurantAdmin.save();

          const categoriesUpdated = await RestaurantAdminService.getMenuCategoriesByAdminId(idRestaurantAdmin);

          return categoriesUpdated;
          
        } catch (e: any) {
          throw new Error(e);
        }
    }

    async findCategoryById(id: string) {
      try {
        const category = await Category.findOne({ _id: id });
        return category;
      } catch (e: any) {
        throw new Error(e);
      }
    }

    async deleteCategory(idRestaurantAdmin : string, idCategory :  string) {
      try {

        await Category.deleteOne({ _id: idCategory });

        await RestaurantAdmin.findOneAndUpdate(
          { _id: idRestaurantAdmin },
          { $pull: { menu:  new ObjectId(idCategory) } },
          { new: true }
        )

        const categoriesUpdated = await RestaurantAdminService.getMenuCategoriesByAdminId(idRestaurantAdmin);
      
        return categoriesUpdated;
        
      } catch (e: any) {
        throw new Error(e);
      }
    }

    async addDishToCategory(categoryId : string, dish :  Dish) {
      try {

        const category = await Category.findOne({ _id: categoryId });
        //category.menu.push(dish);
        console.log(dish);

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

export default new CategoryService();