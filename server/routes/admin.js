var express = require("express");
const adminControllers = require("../controllers/adminControllers");
const multer = require("../middleware/multer");
var router = express.Router();

//1. editAdmin
//localhost:3000/admin/editAdmin/:user_id
router.put("/editAdmin/:user_id", adminControllers.editAdmin);

//2.- addProduct
//localhost:3000/admin/addProduct
router.post('/addProduct', multer('products'), adminControllers.addProduct);

//3.- editProduct
//localhost:3000/admin/editProduct/:product_id
router.put('/editProduct/:product_id', multer('products'), adminControllers.editProduct);

//4.- deleteProduct
//localhost:3000/admin/deleteProduct/:product_id
router.delete('/deleteProduct/:product_id', adminControllers.deleteProduct);

//5.- getAllProducts
//localhost:3000/admin/getAllProducts
router.get('/getAllProducts', adminControllers.getAllProducts);

//6.- getAllUsers
//localhost:3000/admin/getAllUsers
router.get('/getAllUsers', adminControllers.getAllUsers);

//7.- disableUser
//localhost:3000/admin/disableUser/:user_id
router.put('/disable/:user_id', adminControllers.disableUser);

//8.- enableUser
//localhost:3000/admin/enableUser/:user_id
router.put('/enable/:user_id', adminControllers.enableUser);

//9.- productFinder
//localhost:3000/admin/productFinder
router.get('/productFinder', adminControllers.productFinder);

//10.- userFinder
//localhost:3000/admin/userFinder
router.get('/userFinder', adminControllers.userFinder);

//11.- orderFinder
router.get('/orderFinder', adminControllers.orderFinder);

//12.- getUserOrder
router.get('/admin/:user_id/orders/:order_id', adminControllers.getUserOrder);

//13.- updateOrder
router.put('/admin/:user_id/orders/:order_id', adminControllers.updateOrder);

//14.- cancelOrder
router.delete('/admin/:user_id/orders/:order_id', adminControllers.cancelOrder);


module.exports = router;
