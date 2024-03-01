var express = require("express");
const productsControllers = require("../controllers/productsControllers");
var router = express.Router();
const multer = require("../middleware/multer");

//1.- viewAllProducts
//localhost:3000/products
router.get('/', productsControllers.getAllProducts);

//2.- viewProductsByCategory
//localhost:3000/products/:category
router.get('/:category', productsControllers.getProductsByCategory);

//3. - viewOneProduct
//localhost:3000/products/:product_id
router.get('/product/:product_id', productsControllers.viewOneProduct);


module.exports = router;
