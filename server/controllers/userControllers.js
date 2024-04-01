const connection = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require("moment");

require("dotenv").config();

class userControllers {
  register = (req, res) => {
    const {
      name,
      lastname,
      type,
      dni,
      address,
      city,
      province,
      zip_code,
      phone_number,
      email,
      password,
    } = req.body;

    let sqlCheckUser = `SELECT user_id FROM user WHERE email='${email}'`;

    connection.query(sqlCheckUser, (errorCheck, resultCheck) => {
      if (errorCheck) {
        res.status(400).json({ error: errorCheck });
      } else {
        let saltRounds = 8;
        bcrypt.genSalt(saltRounds, (err, saltRounds) => {
          if (err) console.log(err);
          bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) console.log(err);
            let sql = `INSERT INTO user (name, lastname, type, dni, address, city, province, zip_code, phone_number, email, password)
            VALUES ('${name}', '${lastname}', 2,'${dni}', '${address}',
            '${city}', '${province}', '${zip_code}', '${phone_number}',
            '${email}', '${hash}')`;

            connection.query(sql, (error, result) => {
              if (error) console.log(error);
              error
                ? res.status(400).json({ error })
                : res.status(200).json({ result });
            });
          });
        });
      }
    });
  };

  login = (req, res) => {
    let { email, password } = req.body;

    let sqlLogin = `SELECT * FROM user WHERE email = '${email}'`;
    connection.query(sqlLogin, (error, result) => {
      if (error) return res.status(400).json;

      if (!result || !result.length) {
        res.status(401).json("Usuario o contraseña incorrectas");
      } else {
        const [user] = result;
        const hash = user.password;

        // comparar contraseñas
        bcrypt.compare(password, hash, (error, response) => {
          if (error) throw error;

          if (response === true) {
            const token = jwt.sign(
              {
                user: {
                  id: user.user_id,
                  name: user.name,
                  lastname: user.lastname,
                  dni: user.dni,
                  address: user.address,
                  city: user.city,
                  province: user.province,
                  zip_code: user.zip_code,
                  phone_number: user.phone_number,
                  email: user.email,
                },
              },
              process.env.SECRET,
              { expiresIn: "1d" }
            );
            res.status(200).json({ token, user: result[0] });
          } else {
            res.status(401).json("Usuario o contraseña incorrectas");
          }
        });
      }
    });
  };

  editUser = (req, res) => {
    let user_id = req.params.user_id;

    const {
      name,
      lastname,
      type,
      dni,
      address,
      city,
      province,
      zip_code,
      phone_number,
      email,
      password,
    } = req.body;

    if (password) {
      let saltRounds = 8;
      bcrypt.genSalt(saltRounds, (err, saltRounds) => {
        if (err) console.log(err);
        bcrypt.hash(password, saltRounds, (err, hash) => {
          if (err) console.log(err);
          let sqlEditAll = `UPDATE user SET name = '${name}', lastname = '${lastname}', type = '${type}', dni = '${dni}', address = '${address}', city =
          '${city}', province = '${province}', zip_code = '${zip_code}', phone_number = '${phone_number}', email = '${email}', password = '${hash}' WHERE user_id = '${user_id}'`;

          connection.query(sqlEditAll, (error, result) => {
            if (error) console.log(error);
            error
              ? res.status(400).json({ error })
              : res.status(200).json({ result });
          });
        });
      });
    } else {
      let sqlEditNoPassword = `UPDATE user SET name = '${name}', lastname = '${lastname}', dni = '${dni}', address = '${address}', city =
      '${city}', province = '${province}', zip_code = '${zip_code}', phone_number = '${phone_number}', email = '${email}' WHERE user_id = '${user_id}'`;

      connection.query(sqlEditNoPassword, (error, result) => {
        error ? res.status(400).json(error) : res.status(200).json(result);
      });
    }
  };

  userProfile = (req, res) => {
    let user_id = req.params.user_id;
    let sql = `SELECT * FROM user WHERE user_id = '${user_id}'`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json(error) : res.status(200).json(result);
    });
  };

  addProductToWishList = (req, res) => {
    let user_id = req.params.user_id;
    let product_id = req.params.product_id;

    let sql = `INSERT INTO wishlist (user_id, product_id) VALUES ('${user_id}', '${product_id}')`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json(error) : res.stuatus(200).json(result);
    });
  };

  userWishList = (req, res) => {
    let user_id = req.params.user_id;
    let wishList_id = req.params.wishList_id;

    let sqlWishList = `SELECT product.product_id, product.name, product.category, product.description, product.price, product.availability, product.rating, product.img FROM wishList JOIN product ON wishList.product_id = product.product_id
    WHERE wishList.user_id = '${user_id}' AND wishList.list_id = '${wishList_id}';`;

    connection.query(sqlWishList, (error, result) => {
      error ? res.status(400).json(error) : res.status(200).json(result);
    });
  };

  deleteProductFromWishList = (req, res) => {
    let user_id = req.params.user_id;
    let product_id = req.params.product_id;

    let sql = `DELETE FROM wishlist WHERE user_id = '${user_id}' AND product_id = '${product_id}'`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json(error) : res.status(200).json(result);
    });
  };

  addProductToCart = (req, res) => {
    let user_id = req.params.user_id;
    let product_id = req.params.product_id;

    let sql = `INSERT INTO shoppingCart (user_id, product_id) VALUES ('${user_id}', '${product_id}')`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json(error) : res.stuatus(200).json(result);
    });
  };

  userShoppingCart = (req, res) => {
    let user_id = req.params.user_id;
    let cart_id = req.params.cart_id;

    let sqlCart = `SELECT product.product_id, product.name, product.category, product.description, product.price, product.availability, product.rating, product.img FROM shoppingCart JOIN product ON shoppingCart.product_id = product.product_id
    WHERE shoppingCart.user_id = '${user_id}' AND shoppingCart.list_id = '${cart_id}';`;

    connection.query(sqlCart, (error, result) => {
      error ? res.status(400).json(error) : res.status(200).json(result);
    });
  };

  deleteProductFromCart = (req, res) => {
    let user_id = req.params.user_id;
    let product_id = req.params.product_id;

    let sql = `DELETE FROM shoppingCart WHERE user_id = '${user_id}' AND product_id = '${product_id}'`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json(error) : res.status(200).json(result);
    });
  };
}

module.exports = new userControllers();
