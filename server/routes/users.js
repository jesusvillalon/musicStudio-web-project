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

//5.- userWishList
//localhost:3000/:user_id/wishList
router.get('/:user_id/wishList', userControllers.userWishList)



module.exports = router;


