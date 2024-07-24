const express = require('express');
const jwt = require('jsonwebtoken');
const register = require('./routes/register')
const login = require('./routes/login')
const app = express();
const dotenv = require('dotenv')

dotenv.config({ path: './env' })
app.use(express.json())
app.use('/', register)
app.use('/', login)

let PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is up and running on ${PORT} ...`);
});