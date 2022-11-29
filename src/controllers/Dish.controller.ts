import { Request, Response } from "express";
import DishService from "../services/Dish.service";



class DishController {

  
    async addDishToCategory(req: Request, res: Response) {
      try {
        const categoriesUpdated = await DishService.addDishToCategory(req.body.categoryId, req.body.dish);
        
        if(categoriesUpdated == null){
            return res.status(409).send("el plato no pudo ser añadido");
        } else{
            return res.status(200).send(categoriesUpdated);
        }
        
      } catch (e: any) {
  
        return res.status(409).send(e.message);
      }
    }



    


}

export default new DishController();