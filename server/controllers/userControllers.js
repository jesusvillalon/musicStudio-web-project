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
            let sql = `INSERT INTO user (name, lastname, dni, address, city, province, zip_code, phone_number, email, password)
            VALUES ('${name}', '${lastname}', '${dni}', '${address}',
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
                  email: user.email
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
        error ? res.status(400).json(error)
              : res.status(200).json(result);
      });
    }
  };




  userProfile = (req, res) => {
    let user_id = req.params.user_id;
    let sql = `SELECT * FROM user WHERE user_id = '${user_id}'`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json(error)
            : res.status(200).json(result);
    })
  };

  userWishList = (req, res) => {};
}

module.exports = new userControllers();
