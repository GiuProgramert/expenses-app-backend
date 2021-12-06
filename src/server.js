//Import
const express = require('express');
const Auth = require('./controllers/Auth');
const dotenv        = require('dotenv');

//env
dotenv.config();
const { PORT } = process.env;

//Objects
const app = express();

//Configurations
app.use(express.json());

//Routes
app.use('/api/auth', Auth);
app.get('/', (req, res) => {
    res.send('App is running online');
})

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})