//Import
const express = require('express');
const Auth = require('./controllers/Auth/authController');
const { PORT } = require('./config/getEnv');

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