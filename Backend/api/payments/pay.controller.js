const {
    create,
    getPayments,
    getPaymentBypayID,
    updatePayment,
    deletePayment,
  } = require("./pay.service");
  
  const { genSaltSync, hashSync } = require("bcrypt");
  
  module.exports = {
    createPayment: (req, res) => {
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
    getPayments: (req, res) => {
      getPayments((err, results) => {
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
    getPaymentBypayID: (req, res) => {
      const pay_id= req.params.pay_id;
      getPaymentBypayID(pay_id, (err, results) => {
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
    updatePayment: (req, res) => {
      const body = req.body;
      const salt = genSaltSync(10);
      // body.password = hashSync(body.password,salt);
      updatePayment(body, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!results) {
          return res.json({
            success: 0,
            message: "Failes to update payment",
          });
        }
        return res.json({
          success: 1,
          message: "update successfully",
        });
      });
    },
    deletePayment: (req, res) => {
      // const data = req.body;
      // const salt = genSaltSync(10);
      const pay_id = req.params.pay_id;
      deletePayment(pay_id, (err, results) => {
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
          message: "payment deleted successfully",
        });
      });
    },
  };