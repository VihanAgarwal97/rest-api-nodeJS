//DEPENDENCIES

const express = require('express');
//Package for logging requests
const morgan = require('morgan');

const mongoose = require('mongoose');

//Import product routes
const productRoutes = require('./api/routes/products');
//Import order routes
const orderRoutes = require('./api/routes/orders');

//Start a new express app
const app = express();

const dbURI = "mongodb://VihanAgarwal:VihanAgarwal@rest-api-nodejs-shard-00-00-vmgro.mongodb.net:27017,rest-api-nodejs-shard-00-01-vmgro.mongodb.net:27017,rest-api-nodejs-shard-00-02-vmgro.mongodb.net:27017/test?ssl=true&replicaSet=rest-api-nodeJS-shard-0&authSource=admin&retryWrites=true";
//const dbURI = "mongodb+srv://VihanAgarwal:VihanAgarwal@rest-api-nodejs-vmgro.mongodb.net/test?retryWrites=true";
mongoose.connect(dbURI, { useNewUrlParser: true, replicaSet: "rest-api-nodeJS-shard-0"});

//Debbuger for requests.
app.use(morgan('dev'));

//Parse requests correctly
app.use(express.urlencoded({extended: false}));
app.use(express.json());﻿
//Handle CORS errors
app.use((req,res,next) => {
    //Allow anyone to access our RESTful API
    res.header('Access-Control-Allow-Origin', '*');
    //Accept these headers
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');

    //Allow these type of requests
    if(req.method === 'OPTIONS'){
      res.header('Access-Control-Allow-Methods','GET, POST, PUT, PATCH, DELETE');
      return res.status(200).json({

      });
    }
});

//Link the different routes to the endpoints
app.use('/products', productRoutes);
app.use('/orders',  orderRoutes);

//ERROR HANDLING
//Any route that makes it past the above endpoints will be handled below by
//forcibly throwing an error
app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 400;
    next(error);
});

//Triggered when an error is thrown
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
          message: error.message
        }
    });
  });


module.exports = app;
