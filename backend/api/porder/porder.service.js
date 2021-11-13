const pool = require('../../config/database');

module.exports = {

    addPurchaseOrder : (data, callback) => {
        pool.query(
            `INSERT INTO purorder(purorder_user_id, purorder_supc_id, purorder_date, purorder_isActive, purorder_addedDate) VALUES (?,?,?,?,?)`,
            [
                data.purorder_user_id,
                data.purorder_supc_id,
                data.purorder_date,
                data.purorder_isActive,
                data.purorder_addedDate,

            ],
            (error, results) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    getPurchaseOrder  : (callback) => {
        pool.query(
            `SELECT purorder_id, user_name, supc_name, purorder_date, purorder_isActive, purorder_addedDate FROM purorder,user,suppliercompany WHERE 
            user.user_id = purorder.purorder_user_id and suppliercompany.supc_id=purorder.purorder_supc_id`,
            [],
            (error, results) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    getPurchaseOrderByID : (id, callback) => {
        pool.query(
            `SELECT * FROM purorder WHERE purorder_id=?`,
            [
                id
            ],
            (error, results) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        )
    },

    deletePurchaseOrder : (id, callback) => {
        pool.query(
            `DELETE FROM purorder WHERE purorder_id=?`,
            [
                id
            ],
            (error, results) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    updatePurchaseOrder : (data, callback) => {
        pool.query(
            `UPDATE purorder SET purorder_user_id=?, purorder_supc_id=?, purorder_date=?, purorder_isActive=?, purorder_addedDate=? WHERE purorder_id=?`,
            [
                data.purorder_user_id,
                data.purorder_supc_id,
                data.purorder_date,
                data.purorder_isActive,
                data.purorder_addedDate,
                data.purorder_id
            ],
            (error, results) => {
                if(error){
                    return callback(error);
                }
                return callback(results[0]);
            }
        )
    }
}