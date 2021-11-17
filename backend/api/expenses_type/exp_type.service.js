const pool = require("../../config/database");

module.exports = {
  create: (data, callback) => {
    pool.query(
      `insert into expenses_type(exptype_id,	exprtype_name)
                        values(?,?)`,
      [data.extype_id, data.exprtype_name],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getExpTypes: (callback) => {
    pool.query(
      `select exptype_id, exprtype_name from expenses_type`,
      [],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getExpTypeByexTypeID: (exptype_id, callback) => {
    pool.query(
      `select exptype_id, exprtype_name from expenses_type where exptype_id = ?`,
      [exptype_id],
      (error, results, fields) => {
        if (error) {
          callback(error);
        }
        return callback(null, results[0]);
      }
    );
  },
  updateExpType: (data, callback) => {
    pool.query(
      `update  expenses_type set exprtype_name=? where  exptype_id=? `,

      [data.exprtype_name, data.extype_id],
      (error, results, fields) => {
        if (error) {
          callback(error);
        }
        return callback(null, results);
      }
    );
  },
  deleteExpType: (exptype_id, callback) => {
    pool.query(
      `delete from expenses_type where exptype_id = ?`,
      [exptype_id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
};