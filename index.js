const express = require('express');
const connectdb = require('./config/connectdb');
const user = require('./route/user.route.js')
const app = express();

require('dotenv').config()

connectdb();

app.use(express.json())


app.use('/api/user',user)

app.listen(3001,()=>{
    console.log(`running at port 3001`)
})