require('dotenv').config();
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import routes from './routes';

mongoose.connect(process.env.DATABASE_URL as string)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database. Listening...'))


const app = express();

app.use(express.json()) //middleware que transforma la req.body a json
app.use(cors()) //middleware que transforma la req.body a json

const PORT = 3000;

app.get('/ping', (_req, res) => {
    console.log('ping melo')
    console.log('ping')
    res.send('pog')
})
// app.post('/login', (req,res) => {

//     const secret = process.env.SECRET_TOKEN as string

//     const token = jwt.sign(req.body.username, secret)

//     res.json(token)
// }) 

routes(app);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})