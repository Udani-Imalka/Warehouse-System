const {
    createPay_type,
    getPay_types,
    getPay_typeBypTypeID,
    updatePay_type,
    deletePay_type,
  } = require("./pay_type.controller");
  const router = require("express").Router();
  
  router.post("/", createPay_type);
  router.get("/", getPay_types);
  router.get("/:paytype_id", getPay_typeBypTypeID);
  router.patch("/", updatePay_type);
  router.delete("/:paytype_id", deletePay_type);
  
  module.exports = router;
  