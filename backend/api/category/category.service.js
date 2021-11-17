const pool = require("../../config/database");

module.exports = {
  create: (data, callback) => {
    pool.query(
      `insert into category(cat_id, cat_name,	cat_type)
                        values(?,?,?)`,
      [data.cat_id, data.cat_name, data.cat_type],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getCategorys: (callback) => {
    pool.query(
      `select cat_id, cat_name,	cat_type from category `,//where isActive =1
      [],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getCategoryByCategoryId: (cat_id, callback) => {
    pool.query(
      `select cat_id, cat_name,	cat_type from category where cat_id = ?`,
      [cat_id],
      (error, results, fields) => {
        if (error) {
          callback(error);
        }
        return callback(null, results[0]);
      }
    );
  },
  updateCategory: (data, callback) => {
    pool.query(
      `update category set cat_name=?,cat_type=? where cat_id =?`,

      [data.cat_name, data.cat_type, data.cat_id],
      (error, results, fields) => {
        if (error) {
          callback(error);
        }
        return callback(null, results);
      }
    );
  },
  deleteCategory: (cat_id, callback) => {
    pool.query(
      `delete from category where cat_id = ?`,
      [cat_id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
};
