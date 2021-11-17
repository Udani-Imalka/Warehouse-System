const {
    createVariations,
    getVariations,
    getVariationsBypvarId,
    updateVariations,
    deleteVariations,
  } = require("./proVar.controller");
  const router = require("express").Router();
  
  router.post("/", createVariations);
  router.get("/", getVariations);
  router.get("/:pvar_id", getVariationsBypvarId);
  router.patch("/", updateVariations);
  router.delete("/:pvar_id", deleteVariations);
  
  module.exports = router;