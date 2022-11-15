import { Request, Response } from "express";

import RestaurantAdmin from "../models/RestaurantAdmin";

import jwt, { Secret } from "jsonwebtoken";



class LoginService {

    async createRestaurantAdmin(input: RestaurantAdmin) {
        try {
          const user = await RestaurantAdmin.create(input);
          return user.toJSON();
        } catch (e: any) {
          throw new Error(e);
        }
      }

}

export default new LoginService();