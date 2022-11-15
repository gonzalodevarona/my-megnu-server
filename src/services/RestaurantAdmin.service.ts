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
        const user = await RestaurantAdmin.findOne({ email: email });
        return user;
      } catch (e: any) {
        throw new Error(e);
      }
    }
}

export default new RestaurantAdminService();