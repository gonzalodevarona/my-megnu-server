import { Request, Response } from "express";
import MenuService from "../services/Menu.service";



class MenuController {


    async deleteUser(req: Request, res: Response) {
      try {
        const menuExist = await MenuService.findMenuById(req.params.id);
        if (menuExist == null) {
          return res.status(409).send("menu does not exist");
        }
        let menu = await MenuService.deleteMenu(req.params.id);
        return res.send(menu);
      } catch (e: any) {
  
        return res.status(409).send(e.message);
      }
    }

}

export default new MenuController();