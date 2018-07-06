//Handles all the requests to /products

const express = require('express');
const mongoose = require('mongoose');

//Create the API's endpoint router
const router = express.Router();
//Import the mongoose model
const Product = require('../models/product');


//GET requests
router.get('/', (req, res, next) => {
    res.status(200).json({
      message: "test for GET /products"
    });
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    res.status(200).json({
      message: "here is the information for product " + id
    });

});

//POST requests
router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
    });
    product.save()
      .then(result => {
        console.log(result);
      })
      .catch(err => console.log(err));

    res.status(201).json({
      message: "Product Successfully Added...",
      createdProduct: product,
    });
});

//PATCH request
router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    res.status(201).json({
      message: "updated product " + id
    });
});

//DELETE request
router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    res.status(200).json({
      message: "deleted product " + id
    });

});

module.exports = router;
