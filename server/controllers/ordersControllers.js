const connection = require("../config/db");

class ordersControllers {
  createOrder = (req, res) => {
    const user_id = req.params.user_id;

    let getCartProductSql = `SELECT product_id, quantity FROM shoppingCart WHERE user_id = '${user_id}`;

    connection.query(getCartProductSql, (error, cartproducts) => {
      if (cartproducts.lenght === 0) {
        return res.status(400).json({ error: "El carrito está vacío" });
      }
    });

    connection.beginTransaction((beginTransactionErr) => {
      if (beginTransactionErr) {
        console.error("Error al iniciar la transacción:", beginTransactionErr);
        return res
          .status(500)
          .json({ error: "Error al iniciar la transacción" });
      }

      // Crear un nuevo pedido
      const createOrderSql = `
        INSERT INTO Orders (user_id, status)
        VALUES ('${user_id}', 'pending');
      `;

      connection.query(createOrderSql, (createOrderErr, orderResult) => {
        if (createOrderErr) {
          connection.rollback(() => {
            console.error("Error al crear el pedido:", createOrderErr);
            res.status(500).json({ error: "Error al crear el pedido" });
          });
        } else {
          const orderId = orderResult.insertId;

          // Insertar productos en la tabla OrderItems
          const insertOrderItemsSql = `
            INSERT INTO OrderItems (order_id, product_id, quantity, price)
            VALUES ('${order_id}', '${product_id}', '${quantity}', (
              SELECT price FROM product WHERE product_id = '${product_id}'
            ));
          `;

          const orderItemValues = cartProducts.map(
            ({ product_id, quantity }) => [
              orderId,
              product_id,
              quantity,
              product_id,
            ]
          );

          connection.query(
            insertOrderItemsSql,
            [orderItemValues],
            (insertItemsErr) => {
              if (insertItemsErr) {
                connection.rollback(() => {
                  console.error(
                    "Error al insertar los productos del pedido:",
                    insertItemsErr
                  );
                  res.status(500)
                    .json({
                      error: "Error al insertar los productos del pedido",
                    });
                });
              } else {
                // Limpiar el carrito después de crear el pedido
                const clearCartSql = `
                DELETE FROM shoppingCart
                WHERE user_id = '${user_id}';
              `;

                connection.query(clearCartSql, (clearCartErr) => {
                  if (clearCartErr) {
                    connection.rollback(() => {
                      console.error(
                        "Error al limpiar el carrito:",
                        clearCartErr
                      );
                      res.status(500)
                        .json({ error: "Error al limpiar el carrito" });
                    });
                  } else {
                    // Confirmar la transacción
                    connection.commit((commitErr) => {
                      if (commitErr) {
                        connection.rollback(() => {
                          console.error(
                            "Error al confirmar la transacción:",
                            commitErr
                          );
                          res.status(500)
                            .json({
                              error: "Error al confirmar la transacción",
                            });
                        });
                      } else {
                        res.json({ message: "Pedido creado exitosamente" });
                      }
                    });
                  }
                });
              }
            }
          );
        }
      });
    });
  };

  getUserOrders = (req, res) => {
    const user_id = req.params.user_id;

    const sql = `
    SELECT * FROM orders
    WHERE user_id = '${user_id}'`;

    connection.query(sql, (error, result) => {
      if (error) console.log(error);
      error
        ? res.status(400).json({ error })
        : res.status(200).json({ result });
    });
  };

  // Obtener un pedido específico de un usuario
  getUserOrder = (req, res) => {
    const user_id = req.params.user_id;
    const order_id = req.params.order_id;

    // Consulta SQL para obtener un pedido específico de un usuario
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
        res.status(200).json(results);
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
        res.status(200).json(results);
        res.json({ message: "Pedido cancelado exitosamente" });
      }
    });
  };
}

module.exports = new ordersControllers();
