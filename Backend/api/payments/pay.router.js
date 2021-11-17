const {
    createPayment,
    getPayments,
    getPaymentBypayID,
    updatePayment,
    deletePayment,
  } = require("./pay.controller");
  const router = require("express").Router();
  
  router.post("/", createPayment);
  router.get("/", getPayments);
  router.get("/:pay_id", getPaymentBypayID);
  router.patch("/", updatePayment);
  router.delete("/:pay_id", deletePayment);
  
  module.exports = router;
  