const pool = require("../../config/database");

module.exports = {
    addUser: (data, callback) => {
        pool.query(
            `INSERT INTO user (user_code, user_name, user_password, user_type, user_email, user_gender, user_telnumber, user_com_name, user_regDate, user_isActive) VALUES (?,?,?,?,?,?,?,?,?,?)`,
            [
                data.user_code,
                data.user_name,
                data.user_password, 
                data.user_type, 
                data.user_email, 
                data.user_gender, 
                data.user_telnumber,
                data.user_com_name, 
                data.user_regDate, 
                data.user_isActive
            ],
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getUser: (callback) => {
        pool.query(
            `SELECT * FROM user WHERE user_isActive='Active'`,
            [],
            (error, results) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getByID : (id, callback) => {
        pool.query(
            `SELECT * FROM user WHERE user_id = ?`,
            [id],

            (error, results) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        )
    },

    updateUser : (data, callback) => {
        pool.query(
            `UPDATE user SET user_code=?, user_name=?, user_password=?, user_type=?, user_email=?, user_gender=?, user_telnumber=?, user_com_name=?, user_regDate=?, user_isActive=? WHERE user_id=?`,
            [
                data.user_code,
                data.user_name,
                data.user_password, 
                data.user_type, 
                data.user_email, 
                data.user_gender, 
                data.user_telnumber,
                data.user_com_name, 
                data.user_regDate, 
                data.user_isActive,
                data.user_id
            ],

            (error, results, fields) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        )
    },

    deleteUserbyId : (id, callback) => {
        pool.query(
            `UPDATE user SET user_isActive='Inactive' WHERE user_id=?`,
            [id],

            (error, results, fields) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        );
    }
};