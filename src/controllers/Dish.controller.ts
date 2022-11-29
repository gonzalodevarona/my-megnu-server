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

    async getDishById(req: Request, res: Response) {
        try {
          const dish = await DishService.getDishById(req.body.categoryId, req.body.dishId);
          
          if(dish == null){
              return res.status(409).send("el plato no fue encontrado");
          } else{
              return res.status(200).send(dish);
          }
          
        } catch (e: any) {
    
          return res.status(409).send(e.message);
        }
    }

    async updateDish(req: Request, res: Response) {
      try {
        const dish = await DishService.updateDish(req.body.categoryId, req.body.dishId, req.body.dish);
        
        if(dish == null){
            return res.status(200).send("no hay cambios para aplicar al plato");
        } else{
            return res.status(200).send(dish);
        }
        
      } catch (e: any) {
  
        return res.status(409).send(e.message);
      }
  }

    async deleteDishFromCategory(req: Request, res: Response) {
        try {
          const categoriesUpdated = await DishService.deleteDishFromCategory(req.body.categoryId, req.body.dishId);
          
          if(categoriesUpdated == null){
              return res.status(409).send("el plato no pudo ser eliminado");
          } else{
              return res.status(200).send(categoriesUpdated);
          }
          
        } catch (e: any) {
    
          return res.status(409).send(e.message);
        }
      }



    


}

export default new DishController();