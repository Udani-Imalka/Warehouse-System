const {
    createProduct,
    getProducts,
    getProductByproductID,
    updateProduct,
    deleteProduct,
  } = require("./product.controller");
  const router = require("express").Router();
  
  router.post("/", createProduct);
  router.get("/", getProducts);
  router.get("/:p_id", getProductByproductID);
  router.patch("/", updateProduct);
  router.delete("/:p_id", deleteProduct);
  
  module.exports = router;