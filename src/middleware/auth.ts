require('dotenv').config();
import jwt from 'jsonwebtoken';

export default (req : any, res : any, next : any)  => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401).json({ error: 'token missing' })
  
    jwt.verify(token, process.env.SECRET_TOKEN as jwt.Secret, (err : any, user : any) => {
      console.log(err)
      if (err) return res.sendStatus(403).json({ error: 'invalid token' })
      req.user = user
      next()
    })
  }