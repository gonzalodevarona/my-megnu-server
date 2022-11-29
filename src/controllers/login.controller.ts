import { Request, Response } from "express";
import LoginService from "../services/Login.service";



class LoginController {



    async login (req: Request, res: Response) {
      const { body } = req;
      const { email, password } = body;

      const response = await LoginService.login(email, password);

      if(response == null){
        return res.status(401).json({ error: 'invalid user or password' });
      } else {
        return res.status(200).send(response);
      }


    }


}

export default new LoginController();