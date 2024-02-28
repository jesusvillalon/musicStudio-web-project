var mysql = require("mysql"); //Requerimos la librería de mysql.
require("dotenv").config();
// Configuración de la conexión con nuestro workbench de mysql.

var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

connection.connect((error) => {
    if (error) {
        throw error;
    } else {
        console.log("Conexión correcta");
    }
});

module.export = connection;