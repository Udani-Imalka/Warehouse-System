const {
    create,
    getPay_method,
    getPay_methodBypMethodID,
    updatePay_method,
    deletePay_method,
  } = require("./payme.service");
  
  const { genSaltSync, hashSync } = require("bcrypt");
  
  module.exports = {
    createPay_method: (req, res) => {
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
    getPay_method: (req, res) => {
      getPay_method((err, results) => {
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
    getPay_methodBypMethodID: (req, res) => {
      const paym_id = req.params.paym_id;
      getPay_methodBypMethodID(paym_id, (err, results) => {
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
    updatePay_method: (req, res) => {
      const body = req.body;
      const salt = genSaltSync(10);
      // body.password = hashSync(body.password,salt);
      updatePay_method(body, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!results) {
          return res.json({
            success: 0,
            message: "Failes to update pay_method",
          });
        }
        return res.json({
          success: 1,
          message: "update successfully",
        });
      });
    },
    deletePay_method: (req, res) => {
      // const data = req.body;
      // const salt = genSaltSync(10);
      const paym_id = req.params.paym_id;
      deletePay_method(paym_id, (err, results) => {
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
          message: "pay_method deleted successfully",
        });
      });
    },
  };
  