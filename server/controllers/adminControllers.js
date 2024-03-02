const connection = require("../config/db");
const bcrypt = require("bcrypt");

class adminControllers {
  editAdmin = (req, res) => {
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
          let sqlEditAdmin = `UPDATE user SET name = '${name}', lastname = '${lastname}', type = '${type}', dni = '${dni}', address = '${address}', city =
          '${city}', province = '${province}', zip_code = '${zip_code}', phone_number = '${phone_number}', email = '${email}', password = '${hash}' WHERE user_id = '${user_id}'`;

          connection.query(sqlEditAdmin, (error, result) => {
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

  addProduct = (req, res) => {
    const { name, category, description, img, price, availability, rating } =
      req.body;

    let sqlProduct = `INSERT INTO product (name, category, description, price, availability, rating, img) VALUES ('${name}', '${category}', '${description}', '${price}', '${availability}', '${rating}', '${img}')`;

    connection.query(sqlProduct, (error, result) => {
      error ? res.status(400).json(error) : res.status(200).json(result);
    });
  };

  editProduct = (req, res) => {
    let product_id = req.params.product_id;

    const { name, category, description, price, availability, rating } =
      req.body;
    let img = "";

    let sql = `UPDATE product SET name = '${name}', category = '${category}', description = '${description}', price = '${price}', availability = '${availability}', rating = '${rating}' WHERE product_id = '${product_id}'`;

    if (req.file != undefined) {
      img = req.file.filename;
      sql = `UPDATE product SET name = '${name}', category = '${category}', description = '${description}', price = '${price}', availability = '${availability}', rating = '${rating}', img = '${img}' WHERE product_id = '${product_id}'`;
    }

    connection.query(sql, (error, result) => {
      error ? res.status(400).json(error) : res.status(200).json(result);
    });
  };

  deleteProduct = (req, res) => {
    let product_id = req.params.product_id;

    let sqlDeleteProduct = `DELETE FROM product WHERE product_id = '${product_id}'`;

    connection.query(sqlDeleteProduct, (error, result) => {
      error ? res.status(400).json(error) : res.status(200).json(result);
    });
  };

  getAllProducts = (req, res) => {
    let sql = `SELECT * FROM product`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json(error) : res.status(200).json(result);
    });
  };

  getAllUsers = (req, res) => {
    let sql = `SELECT * FROM user`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json(error) : res.status(200).json(result);
    });
  };

  disableUser = (req, res) => {
    let {user_id} = req.params;
    let sql = `UPDATE user SET is_deleted = 1 WHERE user_id = '${user_id}'`;
    let sql2 = `SELECT * FROM user`;

    connection.query(sql, (error, result) => {
      if (error) throw error;
    });
    connection.query(sql2, (error, resultUser) => {
      error ? res.status(400).json(error)
            : res.status(200).json(resultUser);
    });
  };

  enableUser = (req, res) => {
    let {user_id} = req.params;
    let sql = `UPDATE user SET is_deleted = 0 WHERE user_id = '${user_id}'`;
    let sql2 = `SELECT * FROM user`;

    connection.query(sql, (error, result) => {
      if (error) throw error;
    });
    connection.query(sql2, (error, resultUser) => {
      error ? res.status(400).json(error)
            : res.status(200).json(resultUser);
    });
  };

  productFinder = (req, res) => {
    const { search_name } = req.body;

    let sql = `SELECT * FROM product WHERE name LIKE %${search_name}%`;
    connection.query(sql, (error, result) => {
      error ? res.status(400).json(error) : res.status(200).json(result);
    });
  };

  userFinder = (req, res) => {
    const { search_name } = req.body;

    let sql = `SELECT * FROM user WHERE name LIKE %${search_name}%`;
    connection.query(sql, (error, result) => {
      error ? res.status(400).json(error) : res.status(200).json(result);
    });
  };
}

module.exports = new adminControllers();
