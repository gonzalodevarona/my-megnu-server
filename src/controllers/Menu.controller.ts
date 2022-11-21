import { Request, Response } from "express";
import MenuService from "../services/Menu.service";



class MenuController {

    async createMenu(req: Request, res: Response) {
        try {
          const menu = await MenuService.createMenu(req.body);
          return res.send(menu);
        } catch (e: any) {
          console.log(e)
  
          return res.status(409).send(e.message);
        }
      }

}

export default new MenuController();