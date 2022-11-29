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

          return newCategory.toJSON();
          
        } catch (e: any) {
          throw new Error(e);
        }
    }

    async deleteCategory(idRestaurantAdmin : string, idCategory :  string) {
      try {

        const category = await Category.deleteOne({ _id: idCategory });

        await RestaurantAdmin.findOneAndUpdate(
          { _id: idRestaurantAdmin },
          { $pull: { menu:  new ObjectId(idCategory) } },
          { new: true }
        )
      
        return category;
        
      } catch (e: any) {
        throw new Error(e);
      }
  }


}

export default new CategoryService();