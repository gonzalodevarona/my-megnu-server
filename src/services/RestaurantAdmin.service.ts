import RestaurantAdmin from "../models/RestaurantAdmin";

class RestaurantAdminService {

    async createRestaurantAdmin(input: typeof RestaurantAdmin) {
      try {
        const newRestaurantAdmin = await RestaurantAdmin.create(input);
        return newRestaurantAdmin.toJSON();
      } catch (e: any) {
        throw new Error(e);
      }
    }

    async findRestaurantAdminByEmail(email: string) {
      try {
        const restaurantAdmin = await RestaurantAdmin.findOne({ email: email });
        return restaurantAdmin;
      } catch (e: any) {
        throw new Error(e);
      }
    }

    async findRestaurantAdminById(id: string) {
      try {
        const restaurantAdmin = await RestaurantAdmin.findOne({ _id: id });
        return restaurantAdmin;
      } catch (e: any) {
        throw new Error(e);
      }
    }

    async updateRestaurantAdmin(id: string, input: typeof RestaurantAdmin) {
      try {
        const restaurantAdmin = await RestaurantAdmin.findOneAndUpdate({ _id: id }, input, {
          new: true,
        });
        return restaurantAdmin?.toJSON();
      } catch (e: any) {
        throw new Error(e);
      }
    }

    async deleteRestaurantAdmin(id: string) {
      try {
        const restaurantAdmin = await RestaurantAdmin.deleteOne({ _id: id });
        return restaurantAdmin;
      } catch (e: any) {
        throw new Error(e);
      }
    }

    async getMenuCategoriesByAdminId(id: string) {
      try {
        const restaurantAdmin = await RestaurantAdmin.findOne({ _id: id }).populate('menu');
        return restaurantAdmin?.menu;
      } catch (e: any) {
        throw new Error(e);
      }
    }

}

export default new RestaurantAdminService();