var express = require("express");
const userControllers = require("../controllers/userControllers");
var router = express.Router();
const multer = require("../middleware/multer");

//1.- register
//localhost:3000/users/register
router.post('/register', userControllers.register);

//2.- login
//localhost:3000/users/login
router.post('/login', userControllers.login);

//3.- editUser
//localhost:3000/editUser/:user_id
router.put('/editUser/:user_id', userControllers.editUser);

//4.- userProfile
//localhost:3000/userProfile/:user_id
router.get('/userProfile/:user_id', userControllers.userProfile);

//5.- addProductToWishlist
//localhost:3000/:user_id/addToWishList
router.post('/:user_id/addToWishList', userControllers.addProductToWishList);

//6.- userWishList
//localhost:3000/:user_id/:wishList_id
router.get('/:user_id/:wishList_id', userControllers.userWishList);

//7.- deleteProductFromWishList
//localhost:300/:user_id/deleteFromWishList
router.delete('/:user_id/deleteFromWishList', userControllers.deleteProductFromWishList);

//8.- addProductToCart
//localhost:3000/:user_id/addToWishCart
router.post('/:user_id/addToWishCart', userControllers.addProductToCart);

//9.- userShoppingCart
//localhost:3000/:user_id/:cart_id
router.get('/:user_id/:wishList_id', userControllers.userShoppingCart);

//10.- deleteProductFromCart
//localhost:300/:user_id/deleteFromWishList
router.delete('/:user_id/deleteFromWishList', userControllers.deleteProductFromCart);




module.exports = router;


