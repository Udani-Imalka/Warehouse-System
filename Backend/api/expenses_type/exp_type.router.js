const {
    createExpType,
    getExpTypes,
    getExpTypeByexTypeID,
    updateExpType,
    deleteExpType,
  } = require("./exp_type.controller");
  const router = require("express").Router();
  
  router.post("/", createExpType);
  router.get("/", getExpTypes);
  router.get("/:exptype_id", getExpTypeByexTypeID);
  router.patch("/", updateExpType);
  router.delete("/:exptype_id", deleteExpType);
  
  module.exports = router;
  