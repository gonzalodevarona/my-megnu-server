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
          
          await foundRestaurantAdmin.menu.push(newCategory._id);
          return foundRestaurantAdmin.save();

          // const categoriesUpdated = await RestaurantAdminService.getMenuCategoriesByAdminId(idRestaurantAdmin);

          // return categoriesUpdated;
          
        } catch (e: any) {
          throw new Error(e);
        }
    }

    async findCategoryById(idCategory: string) {
      try {
        const category = await Category.findOne({ _id: idCategory });
        return category;
      } catch (e: any) {
        throw new Error(e);
      }
    }

    async deleteCategory(idRestaurantAdmin : string, idCategory :  string) {
      try {

        await Category.deleteOne({ _id: idCategory });

        return await RestaurantAdmin.findOneAndUpdate(
          { _id: idRestaurantAdmin },
          { $pull: { menu:  new ObjectId(idCategory) } },
          { new: true }
        )

        // const categoriesUpdated = await RestaurantAdminService.getMenuCategoriesByAdminId(idRestaurantAdmin);
      
        // return categoriesUpdated;
        
      } catch (e: any) {
        throw new Error(e);
      }
    }



}

export default new CategoryService();