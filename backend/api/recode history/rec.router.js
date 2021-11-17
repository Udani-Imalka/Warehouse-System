const {
    createRecode,
    getRecodes,
    getRecodeByrecID,
    updateRecode,
    deleteRecode,
  } = require("./rec.controller");
  const router = require("express").Router();
  
  router.post("/", createRecode);
  router.get("/", getRecodes);
  router.get("/:rec_id", getRecodeByrecID);
  router.patch("/", updateRecode);
  router.delete("/:rec_id", deleteRecode);
  
  module.exports = router;
  