const pool = require("../../config/database")

module.exports = {

    addGRNinv : (data, callback) => {
        pool.query(
            `INSERT INTO grninvoice(grninv_grn_id, grninv_date, grninv_amount, grninv_isActive, grninv_addedDate) VALUES (?,?,?,?,?)`,
            [
                data.grninv_grn_id, 
                data.grninv_date, 
                data.grninv_amount, 
                data.grninv_isActive, 
                data.grninv_addedDate
            ],
            (error, results)=>{
                if(error){
                    return callback(error);
                }
                return callback(null, results)
            }
        )
    },


    getGRNinv : (callback) => {
        pool.query(
            `SELECT * FROM grninvoice`,
            [],
            (error, results)=>{
                if(error){
                    return callback(error);
                }
                return callback(null, results)
            }
        )
    },


    getGRNinvbyID : (id, callback) =>{
        pool.query(
            `SELECT * FROM grninvoice WHERE grninv_id=?`,
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


    updateGRNinv : (data, callback) => {
        pool.query(
            `UPDATE grninvoice SET grninv_grn_id=?, grninv_date=?, grninv_amount=?, grninv_isActive=?, grninv_addedDate=? WHERE grninv_id=?`,
            [
                data.grninv_grn_id, 
                data.grninv_date, 
                data.grninv_amount, 
                data.grninv_isActive, 
                data.grninv_addedDate,
                data.grninv_id
            ],
            (error, results)=>{
                if(error){
                    return callback(error);
                }
                return callback(null, results[0])
            }
        )
    },


    deleteGRNinv : (id, callback) => {
        pool.query(
            `DELETE FROM grninvoice WHERE grninv_id=?`,
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