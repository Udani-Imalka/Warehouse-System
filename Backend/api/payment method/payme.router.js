const {
    createPay_method,
    getPay_method,
    getPay_methodBypMethodID,
    updatePay_method,
    deletePay_method,
  } = require("./payme.controller");
  const router = require("express").Router();
  
  router.post("/", createPay_method);
  router.get("/", getPay_method);
  router.get("/:paym_id", getPay_methodBypMethodID);
  router.patch("/", updatePay_method);
  router.delete("/:paym_id", deletePay_method);
  
  module.exports = router;