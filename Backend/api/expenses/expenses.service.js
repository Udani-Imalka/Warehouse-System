const pool = require("../../config/database");

module.exports = {
  create: (data, callback) => {
    pool.query(
      `insert into expenses(exp_refNumber, exp_refAmount , exptype_id)
                        values(?,?,?)`,
      [data.exp_refNumber, data.exp_refAmount, data.exptype_id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getExpenses: (callback) => {
    pool.query(
      `select exp_refNumber, exp_refAmount ,exprtype_name 
      from expenses,expenses_type
      where expenses_type.exptype_id= expenses.exptype_id`,
      [],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getExpensesByexpID: (exp_id, callback) => {
    pool.query(
      `select  exp_id, exp_refNumber, exp_refAmount, exptype_id from expenses where exp_id = ?`,
      [exp_id],
      (error, results, fields) => {
        if (error) {
          callback(error);
        }
        return callback(null, results[0]);
      }
    );
  },
  updateExpenses: (data, callback) => {
    pool.query(
      `update expenses set  exp_refNumber=?, exp_refAmount=? ,exptype_id=? where exp_id =?`,

      [data.exp_refNumber, data.exp_refAmount, data.exp_id, data.exptype_id],
      (error, results, fields) => {
        if (error) {
          callback(error);
        }
        return callback(null, results);
      }
    );
  },
  deleteExpenses: (exp_id, callback) => {
    pool.query(
      `delete from expenses where exp_id = ?`,
      [exp_id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
};
