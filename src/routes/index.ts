import { Express } from "express";
import loginController from "../controllers/login.controller";
import restaurantAdminController from "../controllers/RestaurantAdmin.controller";
import categoryController from "../controllers/Category.controller";
import dishController from "../controllers/Dish.controller";
import auth from "../middleware/auth";

function  routes(app: Express) {
    
    // login route
    app.post("/api/login", loginController.login);
    app.post("/api/register", restaurantAdminController.createRestaurantAdmin);

    // admin routes
    app.get("/api/admin", restaurantAdminController.getRestaurantAdmin);
    app.get("/api/admin/menu", restaurantAdminController.getRestaurantAdminCategoriesById);
    app.put("/api/admin", restaurantAdminController.updateRestaurantAdmin);
    app.delete("/api/admin", restaurantAdminController.deleteRestaurantAdmin);

    // menu categories
    app.get("/api/menu/category", categoryController.getCategoryById); 
    app.get("/api/menu/category/dishes", dishController.addDishToCategory); //todo
    app.post("/api/menu/category", categoryController.createCategory);
    app.delete("/api/menu/category", categoryController.deleteCategory);

    // menu category dishes
    app.get("/api/menu/category/dish", dishController.getDishById);
    app.post("/api/menu/category/dish", dishController.addDishToCategory);
    app.delete("/api/menu/category/dish", dishController.deleteDishFromCategory);

    // menu routes
    //app.post("/api/menu/add", menuController.createMenu);

    // this route must be erased, it was made for testing purposes
    app.post("/api/checkAuth", auth, (req, _res) => {
        console.log(req)
    });
    
}

export default routes;