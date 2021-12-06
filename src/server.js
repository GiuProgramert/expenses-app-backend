//Import
const express = require('express');
const Auth = require('./controllers/Auth');

//Objects
const port = 3000
const app = express();

//Configurations
app.use(express.json());

//Routes
app.use('/api/auth', Auth);
app.get('/', (req, res) => {
    res.send('App is running online');
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})