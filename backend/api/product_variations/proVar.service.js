const pool = require("../../config/database");

module.exports = {
  create: (data, callback) => {
    pool.query(
      `insert into product_variations(pvar_id, pvar_name, pvar_type)
                        values(?,?,?)`,
      [
        data.pvar_id, data.pvar_name, data.pvar_type  
      ],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getVariations: (callback) => {
    pool.query(
      `select pvar_id, pvar_name, pvar_type from product_variations`,
      [],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getVariationsBypvarId: (pvar_id, callback) => {
    pool.query(
      `select  pvar_id, pvar_name, pvar_type from product_variations where pvar_id= ?`,
      [pvar_id],
      (error, results, fields) => {
        if (error) {
          callback(error);
        }
        return callback(null, results[0]);
      }
    );
  },
  updateVariations: (data, callback) => {
    pool.query(
      `update product_variations set pvar_name=?, pvar_type=? where pvar_id =?`,

      [
        data.pvar_name, data.pvar_type,data.pvar_id
      ],
      (error, results, fields) => {
        if (error) {
          callback(error);
        }
        return callback(null, results);
      }
    );
  },
  deleteVariations: (pvar_id, callback) => {
    pool.query(
      `delete from product_variations where pvar_id = ?`,
      [pvar_id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
};