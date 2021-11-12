const pool = require("../../config/database");

module.exports = {
  create: (data, callback) => {
    pool.query(
      `insert into brand(brand_id,	brand_num,	brand_name,	brand_type,	brand_image,	brand_isActive,	brand_addedDate	)
                        values(?,?,?,?,?,?,?)`,
      [
        data.brand_id,
        data.brand_num,
        data.brand_name,
        data.brand_type,
        data.brand_image,
        data.brand_isActive,
        data.brand_addedDate,
      ],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getBrands: (callback) => {
    pool.query(
      `select brand_id,	brand_num,	brand_name,	brand_type,	brand_image,	brand_isActive,	brand_addedDate from brand`,
      [],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getBrandByBrandId: (brand_id, callback) => {
    pool.query(
      `select  brand_id,	brand_num,	brand_name,	brand_type,	brand_image,	brand_isActive,	brand_addedDate from brand where brand_id= ?`,
      [brand_id],
      (error, results, fields) => {
        if (error) {
          callback(error);
        }
        return callback(null, results[0]);
      }
    );
  },
  updateBrand: (data, callback) => {
    pool.query(
      `update brand set brand_num=?,brand_name=?,brand_type=?,brand_image=?,brand_isActive=?,brand_addedDate=? where brand_id =?`,

      [
        data.brand_num,
        data.brand_name,
        data.brand_type,
        data.brand_image,
        data.brand_isActive,
        data.brand_addedDate,
        data.brand_id,
      ],
      (error, results, fields) => {
        if (error) {
          callback(error);
        }
        return callback(null, results);
      }
    );
  },
  deleteBrand: (brand_id, callback) => {
    pool.query(
      `delete from brand where brand_id = ?`,
      [brand_id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
};
