
const express = require('express');
const router = express.Router();
const ordersControllers = require('../controllers/ordersControllers');

//1.- createOrder
router.post('/user/:user_id/orders', ordersControllers.createOrder);

//2.- getUserOrders
router.get('/user/:user_id/orders', ordersControllers.getUserOrders);

//3.- getUserOrder
router.get('/user/:user_id/orders/:order_id', ordersControllers.getUserOrder);

//4.- updateOrder
router.put('/user/:user_id/orders/:order_id', ordersControllers.updateOrder);

//5.- cancelOrder
router.delete('/user/:user_id/orders/:order_id', ordersControllers.cancelOrder);

module.exports = router;
