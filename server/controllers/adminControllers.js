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
    const { name, brand, category, description, img, price, availability, rating } =
      req.body;

    let sqlProduct = `INSERT INTO product (name, brand, category, description, price, availability, rating, img) VALUES ('${name}', '${brand}', '${category}', '${description}', '${price}', '${availability}', '${rating}', '${img}')`;

    connection.query(sqlProduct, (error, result) => {
      error ? res.status(400).json(error) : res.status(200).json(result);
    });
  };

  editProduct = (req, res) => {
    let product_id = req.params.product_id;

    const { name, brand, category, description, price, availability, rating } =
      req.body;
    let img = "";

    let sql = `UPDATE product SET name = '${name}', brand = '${brand}', category = '${category}', description = '${description}', price = '${price}', availability = '${availability}', rating = '${rating}' WHERE product_id = '${product_id}'`;

    if (req.file != undefined) {
      img = req.file.filename;
      sql = `UPDATE product SET name = '${name}', brand = '${brand}', category = '${category}', description = '${description}', price = '${price}', availability = '${availability}', rating = '${rating}', img = '${img}' WHERE product_id = '${product_id}'`;
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

  orderFinder = (req, res) => {
    const { search_name } = req.body;

    let sql = `SELECT * FROM orders WHERE name LIKE %${search_name}%`;
    connection.query(sql, (error, result) => {
      error ? res.status(400).json(error) : res.status(200).json(result);
    });
  };

  getUserOrder = (req, res) => {
    const user_id = req.params.user_id;
    const order_id = req.params.order_id;

    const sql = `
    SELECT * FROM orders
    WHERE user_id = '${user_id}' AND order_id = '${order_id}';
  `;

    connection.query(sql, (err, results) => {
      if (err) {
        console.error("Error al obtener el pedido del usuario:", err);
        res
          .status(500)
          .json({ error: "Error al obtener el pedido del usuario" });
      } else {
        res.json({ order: results[0] }); // Suponiendo que solo hay un pedido con ese ID para el usuario
      }
    });
  };


  updateOrder = (req, res) => {
    const user_id = req.params.user_id;
    const order_id = req.params.order_id;
    const { status } = req.body;


    const updateSql = ` UPDATE orders SET status = '${status}' WHERE user_id = '${user_id}' AND order_id = '${order_id}';
  `;

    connection.query(updateSql, (error, results) => {
      if (error) {
        console.error("Error al actualizar el pedido del usuario:", error);
        res
          .status(500)
          .json({ error: "Error al actualizar el pedido del usuario" });
      } else {
        res.status(200).json(results)
        res.json({ message: "Pedido actualizado exitosamente" });
      }
    });
  };

  // Cancelar un pedido
  cancelOrder = (req, res) => {
    const user_id = req.params.user_id;
    const order_id = req.params.order_id;

    // Consulta SQL para cancelar un pedido específico de un usuario
    const cancelSql = `
    UPDATE orders
    SET status = 'cancelled'
    WHERE user_id = '${user_id}' AND order_id = '${order_id}';
  `;

    connection.query(cancelSql, (err, results) => {
      if (err) {
        console.error("Error al cancelar el pedido del usuario:", err);
        res
          .status(500)
          .json({ error: "Error al cancelar el pedido del usuario" });
      } else {
        res.status(200).json(results)
        res.json({ message: "Pedido cancelado exitosamente" });
      }
    });
  };
}

module.exports = new adminControllers();
