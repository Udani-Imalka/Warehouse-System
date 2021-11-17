const pool = require("../../config/database")

module.exports = {

    addGRNcart : (data, callback) => {
        pool.query(
            `INSERT INTO grncart(grncart_p_id, grncart_grn_id, grncart_qty, grncart_unit, grncart_buyingPrice, grncart_isActive, grncart_addedDate) VALUES (?,?,?,?,?,?,?)`,
            [
                data.grncart_p_id, 
                data.grncart_grn_id, 
                data.grncart_qty, 
                data.grncart_unit, 
                data.grncart_buyingPrice, 
                data.grncart_isActive, 
                data.grncart_addedDate
            ],
            (error, results)=>{
                if(error){
                    return callback(error);
                }
                return callback(null, results)
            }
        )
    },


    getAllGRNcart : (callback) => {
        pool.query(
            `SELECT * FROM grncart`,
            [],
            (error, results)=>{
                if(error){
                    return callback(error);
                }
                return callback(null, results)
            }
        )
    },


    getGRNcartByID : (id, callback) =>{
        pool.query(
            `SELECT * FROM grncart WHERE grncart_id=?`,
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


    updateGRNcart : (data, callback) => {
        pool.query(
            `UPDATE grncart SET grncart_p_id=?, grncart_grn_id=?, grncart_qty=?, grncart_unit=?, grncart_buyingPrice=?, grncart_isActive=?, grncart_addedDate=? WHERE grncart_id=?`,
            [
                data.grncart_p_id, 
                data.grncart_grn_id, 
                data.grncart_qty, 
                data.grncart_unit, 
                data.grncart_buyingPrice, 
                data.grncart_isActive, 
                data.grncart_addedDate,
                data.grncart_id
            ],
            (error, results)=>{
                if(error){
                    return callback(error);
                }
                return callback(null, results)
            }
        )
    },


    deleteGRNcart : (id, callback) => {
        pool.query(
            `DELETE FROM grncart WHERE grncart_id=?`,
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