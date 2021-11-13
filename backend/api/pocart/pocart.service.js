const pool = require('../../config/database')

module.exports = {

    addPoc : (data, callback) => {
        pool.query(
            `INSERT INTO pocart(poc_p_id, poc_purorder_id, poc_qty, poc_buyingPrice, poc_totalValue, poc_isActive, poc_addedDate) VALUES (?,?,?,?,?,?,?)`,
            [
                data.poc_p_id,
                data.poc_purorder_id,
                data.poc_qty,
                data.poc_buyingPrice,
                data.poc_totalValue,
                data.poc_isActive,
                data.poc_addedDate
            ],

            (error, results) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    getAllPoc : (callback) => {
        pool.query(
            `SELECT * FROM pocart`,
            [],

            (error, results) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    getPocByID : (id, callback) => {
        pool.query(
            `SELECT * FROM pocart WHERE poc_id=? `,
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

    deletePoc : (id, callback) => {
        pool.query(
            `DELETE FROM pocart WHERE poc_id=?`,
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

    updatePoc : (data, callback) => {
        pool.query(
            `UPDATE pocart SET poc_p_id=?, poc_purorder_id=?, poc_qty=?, poc_buyingPrice=?, poc_totalValue=?, poc_isActive=?, poc_addedDate=? WHERE poc_id=?`,
            [
                data.poc_p_id,
                data.poc_purorder_id,
                data.poc_qty,
                data.poc_buyingPrice,
                data.poc_totalValue,
                data.poc_isActive,
                data.poc_addedDate,
                data.poc_id    
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