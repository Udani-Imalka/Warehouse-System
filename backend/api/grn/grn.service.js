const pool = require("../../config/database")

module.exports = {

    addGRN : (data, callback) => {
        pool.query(
            `INSERT INTO grn(grn_supc_id, grn_user_id, grn_purorder_id, grn_date, grn_isActive, grn_addedDate) VALUES (?,?,?,?,?,?)`,
            [
                data.grn_supc_id, 
                data.grn_user_id, 
                data.grn_purorder_id, 
                data.grn_date, 
                data.grn_isActive, 
                data.grn_addedDate
            ],
            (error, results)=>{
                if(error){
                    return callback(error);
                }
                return callback(null, results)
            }
        )
    },


    getGRN : (callback) => {
        pool.query(
            `SELECT grn_id, supc_name, user_name, grn_purorder_id, grn_date, grn_isActive, grn_addedDate 
            FROM grn,suppliercompany,user WHERE suppliercompany.supc_id=grn.grn_supc_id AND user.user_id=grn.grn_user_id`,
            [],
            (error, results)=>{
                if(error){
                    return callback(error);
                }
                return callback(null, results)
            }
        )
    },


    getGRNbyID : (id, callback) =>{
        pool.query(
            `SELECT grn_id, grn_supc_id, grn_user_id, grn_purorder_id, grn_date, grn_isActive, grn_addedDate FROM grn,supplier,user WHERE grn_id=? AND supplier.sup_id=grn.grn_supc_id AND user.user_id=grn.grn_user_id`,
            [
                id
            ],
            (error, results)=>{
                if(error){
                    return callback(error);
                }
                return callback(null, results[0])
            }
        )
    },


    updateGRN : (data, callback) => {
        pool.query(
            `UPDATE grn SET grn_supc_id=?, grn_user_id=?, grn_purorder_id=?, grn_date=?, grn_isActive=?, grn_addedDate=? WHERE grn_id=?`,
            [
                data.grn_supc_id, 
                data.grn_user_id, 
                data.grn_purorder_id, 
                data.grn_date, 
                data.grn_isActive, 
                data.grn_addedDate,
                data.grn_id
            ],
            (error, results)=>{
                if(error){
                    return callback(error);
                }
                return callback(null, results)
            }
        )
    },


    deleteGRN : (id, callback) => {
        pool.query(
            `DELETE FROM grn WHERE grn_id=?`,
            [
                id
            ],
            (error, results)=>{
                if(error){
                    return callback(error);
                }
                return callback(null, results)
            }
        )
    }
}