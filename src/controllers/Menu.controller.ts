import { Request, Response } from "express";
import MenuService from "../services/Menu.service";



class MenuController {


  async createMenu(req: Request, res: Response) {
    try {

      const menu = await MenuService.createMenu(req.body.id, req.body.menu);
      if (menu == null) {
        return res.status(409).send("Menu could not be created");
      }

      return res.send(menu);
    } catch (e: any) {
      console.log(e)

      return res.status(409).send(e.message);
    }
  }

  async addCategoryToMenu(req: Request, res: Response) {
    try {

      const menu = await MenuService.createMenu(req.body.id, req.body.menu);
      if (menu == null) {
        return res.status(409).send("Menu could not be created");
      }

      return res.send(menu);
    } catch (e: any) {
      console.log(e)

      return res.status(409).send(e.message);
    }
  }

async updateMenu(req: Request, res: Response) {
    try {
      const menuExist = await MenuService.findMenuById(req.body.id);
      if (menuExist == null) {
        return res.status(409).send("Restaurant Admin does not exist");
      }

      if (req.body.password) {
        req.body.password = await encrypt(req.body.password);
      }

      const user = await MenuService.updateMenu(req.body.id, req.body.menu);
      return res.send(user);
    } catch (e: any) {
      
      return res.status(409).send(e.message);
    }
}

async getMenu(req: Request, res: Response) {
    try {
        const menuExist = await MenuService.findMenuById(req.body.id);
        if (menuExist == null) {
            return res.status(409).send("Restaurant Admin does not exist");
        }
        menuExist.password = "";
        return res.send(menuExist);
    } catch (e: any) {

        return res.status(409).send(e.message);
    }
}


async deleteMenu(req: Request, res: Response) {
  try {
    const menuExist = await MenuService.findMenuById(req.body.id);
    if (menuExist == null) {
      return res.status(409).send("Restaurant Admin does not exist");
    }
    let menu = await MenuService.deleteMenu(req.body.id);
    return res.send(menu);
  } catch (e: any) {

    return res.status(409).send(e.message);
  }
}

}

}

export default new MenuController();