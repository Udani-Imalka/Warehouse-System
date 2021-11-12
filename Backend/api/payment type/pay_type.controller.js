const {
    create,
    getPay_types,
    getPay_typeBypTypeID,
    updatePay_type,
    deletePay_type,
  } = require("./pay_type.service");
  
  const { genSaltSync, hashSync } = require("bcrypt");
  
  module.exports = {
    createPay_type: (req, res) => {
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
    getPay_types: (req, res) => {
      getPay_types((err, results) => {
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
    getPay_typeBypTypeID: (req, res) => {
      const paytype_id = req.params.paytype_id;
      getPay_typeBypTypeID(paytype_id, (err, results) => {
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
    updatePay_type: (req, res) => {
      const body = req.body;
      const salt = genSaltSync(10);
      // body.password = hashSync(body.password,salt);
      updatePay_type(body, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!results) {
          return res.json({
            success: 0,
            message: "Failes to update pay_type",
          });
        }
        return res.json({
          success: 1,
          message: "update successfully",
        });
      });
    },
    deletePay_type: (req, res) => {
      // const data = req.body;
      // const salt = genSaltSync(10);
      const paytype_id = req.params.paytype_id;
      deletePay_type(paytype_id, (err, results) => {
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
          message: "pay_type deleted successfully",
        });
      });
    },
  };
  