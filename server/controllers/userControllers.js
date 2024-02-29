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
    let {email, password} = req.body;

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
                  email: user.email,
                  name: user.name,
                  id: user.user_id,
                  type: user.type,
                  img: user.img_name,
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
  }

  editUser = (req, res) => {};

  userProfile = (req, res) => {};

  userWishList = (req, res) => {};

}

module.exports = new userControllers();
