const connection = require("../config/db");
const jwt = require("jsonwebtoken");
const moment = require("moment");

require("dotenv").config();

class productsControllers {

  getAllProducts = (req, res) => {

    let sql = `SELECT * FROM product`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json(error)
            : res.status(200).json(result);
    })

  };

  getProductsByCategory = (req, res) => {
    let category = req.params.category;

    let sql = `SELECT * FROM product WHERE category = '${category}'`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json(error)
            : res.status(200).json(result);
    })

  };

  viewOneProduct = (req, res) => {
    let product_id = req.params.product_id;
    let category = req.params.category;

    let sqlProduct = `SELECT * FROM product WHERE product_id = '${product_id}' AND category = '${category}'`;

    connection.query(sqlProduct, (error, result) => {
      error ? res.status(400).json(error)
            : res.status(200).json(result[0]);
    })

  }


};

module.exports = new productsControllers();
