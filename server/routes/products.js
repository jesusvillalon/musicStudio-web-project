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

//3.- viewOneProduct
//localhost:3000/products/:category/:product_id
router.get('/:category/:product_id', productsControllers.viewOneProduct);

//4.- addReview
//localhost:3000/products/:product_id/addReview

//5.- getReviews
//localhost:3000/products/reviews

//6.- deleteReview
//localhost:3000/products/:product_id/deleteReview


module.exports = router;
