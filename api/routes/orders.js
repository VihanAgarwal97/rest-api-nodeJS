//Handles all the requests to /orders

const express = require('express');
//Create the API's endpoint router
const router = express.Router();

//GET requests
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "test for GET /orders",
    });
});

router.get('/:orderID', (req, res, next) => {
    res.status(200).json({
      message: "order details",
      id: req.params.orderID
    });
});

//POST requests
router.post('/', (req, res, next) => {
    const order = {
        prodcutId: req.body.productId,
        quantity: req.body.quantity,
    };
    res.status(201).json({
      message: "New Order Created...",
      newOrder: order,
    });
});

//DELETE requests
router.delete('/:orderID', (req, res, next) => {
    res.status(201).json({
      message: "order deleted",
      id: req.params.orderID
    });
});

module.exports = router;
