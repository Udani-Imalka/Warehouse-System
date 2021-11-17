const {
    create,
    getProducts,
    getProductByproductID,
    updateProduct,
    deleteProduct,
  } = require("./product.service");
  
  const { genSaltSync, hashSync } = require("bcrypt");
  
  module.exports = {
    createProduct: (req, res) => {
      const body = req.body;
  
      create(body, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Database connection error",
          });
        }
        return res.status(200).json({
          success: 1,
          data: results,
        });
      });
    },
    getProducts: (req, res) => {
      getProducts((err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        return res.json({
          success: 1,
          data: results,
        });
      });
    },
    getProductByproductID: (req, res) => {
      const p_id= req.params.p_id;
      getProductByproductID(p_id, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!results) {
          return res.json({
            success: 0,
            message: "Recode not found",
          });
        }
        return res.json({
          success: 1,
          data: results,
        });
      });
    },
    updateProduct: (req, res) => {
      const body = req.body;
      const salt = genSaltSync(10);
      // body.password = hashSync(body.password,salt);
      updateProduct(body, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!results) {
          return res.json({
            success: 0,
            message: "Failes to update product",
          });
        }
        return res.json({
          success: 1,
          message: "update successfully",
        });
      });
    },
    deleteProduct: (req, res) => {
      const p_id = req.params.p_id;
      // const data = req.body;
      // const salt = genSaltSync(10);
      deleteProduct(p_id, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!results) {
          return res.json({
            success: 0,
            message: "Recode not found",
          });
        }
        return res.json({
          success: 1,
          message: "product deleted successfully",
        });
      });
    },
    
  };