const express = require('express');
const app = express();
const mongoose = require('./database/mongoose');
app.use(express.json());

/*
CORS - Cross Origin Request Security.
localhost:3000 - backend api
localhost:4200 -frontend
 */

 app.use((req, res, nest) => {
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTION, PUT, PATCH, DELETE");
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     next();
 }); 

app.listen(3000, () => console.log("Server is Connected on port 3000"));