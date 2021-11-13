const pool = require("../../config/database");

module.exports = {

    addSupplier : (data, callback) => {
        pool.query(
            `INSERT INTO supplier (sup_name, sup_address1, sup_address2, sup_postalcode, sup_district, sup_country, sup_telnumber, sup_email, sup_isActive, sup_createdDate, sup_supc_id) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.sup_name,
                data.sup_address1,
                data.sup_address2, 
                data.sup_postalcode, 
                data.sup_district, 
                data.sup_country, 
                data.sup_telnumber,
                data.sup_email,
                data.sup_isActive,
                data.sup_createdDate, 
                data.sup_supc_id
            ],

            (error, results) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getSuppliers : (callback) => {

        pool.query(
            `SELECT sup_id, sup_name, sup_address1, sup_address2, sup_postalcode, sup_district, sup_country, sup_telnumber, sup_email, sup_isActive, sup_createdDate, supc_name FROM supplier,suppliercompany WHERE sup_isActive='Active' AND suppliercompany.supc_id=supplier.sup_supc_id`,
            [],

            (error, results) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },


    getSupplierByID : (id, callback) => {

        pool.query(
            `SELECT * FROM supplier WHERE sup_id=?`,
            [id],

            (error, results) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        )
    },


    deleteSupplierByID : (id, callback) => {

        pool.query(
            `UPDATE supplier SET sup_isActive='Inactive' WHERE sup_id=?`,
            [id],

            (error, results) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        )
    },


    updateSupplier : (data, callback) => {
        pool.query(
            `UPDATE supplier SET sup_name=?, sup_address1=?, sup_address2=?, sup_postalcode=?, sup_district=?, sup_country=?, sup_telnumber=?, sup_email=?, sup_isActive=?, sup_createdDate=?, sup_supc_id=? WHERE sup_id=?`,
            [
                data.sup_name,
                data.sup_address1,
                data.sup_address2, 
                data.sup_postalcode, 
                data.sup_district, 
                data.sup_country, 
                data.sup_telnumber,
                data.sup_email,
                data.sup_isActive,
                data.sup_createdDate, 
                data.sup_supc_id,
                data.sup_id
            ],

            (error, results) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    }
}