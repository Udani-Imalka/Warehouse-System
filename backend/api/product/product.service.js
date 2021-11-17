const pool = require("../../config/database");

module.exports = {
  create: (data, callback) => {
    pool.query(
      `insert into products (p_name,p_pvar_id,p_brand_id,p_cat_id,p_punit_id,p_barcode,	p_qty,	p_unit_qty,	p_buyingPrice,	p_sellingPrice,	p_unitPrice,	p_unitValue,	p_image,	p_isActive,	p_addedDate)
                        values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
  
        data.p_name,
        data.pvar_id,
        data.brand_id,
        data.cat_id,
        data.punit_id,
        data.p_barcode,
        data.p_qty,
        data.p_unit_qty,
        data.p_buyingPrice,
        data.p_sellingPrice,
        data.p_unitPrice,
        data.p_unitValue,
        data.p_image,
        data.p_isActive,
        data.p_addedDate,
      ],
      (error, results, fields) => {
        if (error) {
          console.log(data);
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },


  getProducts: (callback) => {
    pool.query(
      `SELECT p_id, p_name,	pvar_name,	brand_name,	cat_name,	punit_name,	p_barcode,	p_qty,	p_unit_qty,	p_buyingPrice,	p_sellingPrice,	p_unitPrice,	p_unitValue,	p_image,	p_isActive,	p_addedDate 
      FROM products,brand,category,product_variations,product_unit 
      WHERE brand.brand_id = products.p_brand_id AND category.cat_id = products.p_cat_id AND product_variations.pvar_id = products.p_pvar_id AND  
        product_unit.punit_id = products.p_punit_id AND p_isActive= 1`,
      [],
      (error, results) => {
        if (error) {
          return callback(error);
        }
        
        return callback(null, results);
        
      }
    );
  },
  getProductByproductID: (p_id, callback) => {
    pool.query(
      `select * from products where p_id = ?`,
      [p_id],
      (error, results, fields) => {
        if (error) {
          callback(error);
        }
        return callback(null, results[0]);
      }
    );
  },
  updateProduct: (data, callback) => {
    pool.query(
      `update products set p_id=?,	p_name=?,	p_pvar_id=?,	p_brand_id=?,	p_cat_id=?,	p_punit_id=?,	p_barcode=?,	p_qty=?,	p_unit_qty=?,	p_buyingPrice=?,	p_sellingPrice=?,	p_unitPrice=?,	p_unitValue=?,	p_image=?,	p_isActive=?,	p_addedDate=? where p_id=?`,

      [
        data.p_name,
        data.p_pvar_id,
        data.p_brand_id,
        data.p_cat_id,
        data.p_punit_id,
        data.p_barcode,
        data.p_qty,
        data.p_unit_qty,
        data.p_buyingPrice,
        data.p_sellingPrice,
        data.p_unitPrice,
        data.p_unitValue,
        data.p_image,
        data.p_isActive,
        data.p_addedDate,
        data.p_id,
      ],
      (error, results, fields) => {
        if (error) {
          callback(error);
        }
        return callback(null, results);
      }
    );
  },
  deleteProduct: (p_id, callback) => {
    pool.query(
      `update  products set p_isActive='0' where p_id = ? `,
      [p_id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
};
