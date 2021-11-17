const pool = require("../../config/database")

module.exports = {

    addSupCompany : (data, callback) => {
        pool.query(
            `INSERT INTO suppliercompany(supc_name, supc_addedDate) VALUES (?,?)`,
            [
                data.supc_name,
                data.supc_addedDate
            ],
            (error, results) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    getSupCompany: (callback) => {
        pool.query(
            `SELECT * FROM suppliercompany`,
            [],
            (error, results) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getCompanyByID : (id, callback) => {
        pool.query(
            `SELECT * FROM suppliercompany WHERE supc_id = ?`,
            [id],

            (error, results) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        )
    },

    updateSupCompany : (data, callback) => {
        pool.query(
            `UPDATE suppliercompany SET supc_name=?, supc_addedDate=? WHERE supc_id=?`,
            [
               data.supc_name,
               data.supc_addedDate 
            ],

            (error, results) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        )
    },

    deleteSupCompanyById : (id, callback) => {
        pool.query(
            `DELETE FROM suppliercompany WHERE supc_id=?`,
            [id],

            (error, results, fields) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        );
    }
}