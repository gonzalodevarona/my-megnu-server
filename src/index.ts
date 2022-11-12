import express from 'express';

const app = express();

app.use(express.json()) //middleware que transforma la req.body a json

const PORT = 3000;

app.get('/ping', (_req, res) => {
    console.log('ping melo')
    console.log('ping')
    res.send('pog')
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})