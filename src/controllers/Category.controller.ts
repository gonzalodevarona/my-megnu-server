import { Request, Response } from "express";
import CategoryService from "../services/Category.service";



class CategoryController {

  async createCategory(req: Request, res: Response) {
    try {

      const category = await CategoryService.createCategory(req.body.restaurantAdminId, req.body.category);
      if (category == null) {
        return res.status(409).send("category could not be created");
      }

      return res.send(category);
    } catch (e: any) {
      console.log(e)

      return res.status(409).send(e.message);
    }
  }

    async deleteCategory(req: Request, res: Response) {
      try {
        const category = await CategoryService.deleteCategory(req.body.restaurantAdminId, req.body.categoryId);
        if (category == null) {
          return res.status(409).send("Restaurant Admin does not exist");
        }

        return res.send(category);
      } catch (e: any) {
  
        return res.status(409).send(e.message);
      }
    }



    


}

export default new CategoryController();