const { createPool } = require("mysql");

const pool = createPool({
    port: 3306,
    host: "localhost",
    user: "root",
    password: "",
    database: "warehouse",
    connectionLimit: 20
});

module.exports = pool;