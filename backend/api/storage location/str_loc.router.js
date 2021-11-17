const {
    createStorage,
    getStorages,
    getStorageByrackID,
    updateStorage,
    deleteStorage,
  } = require("./str_loc.controller");
  const router = require("express").Router();
  
  router.post("/", createStorage);
  router.get("/", getStorages);
  router.get("/:st_id", getStorageByrackID);
  router.patch("/", updateStorage);
  router.delete("/:st_id", deleteStorage);
  
  module.exports = router;