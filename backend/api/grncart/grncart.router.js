const { addNewGRNcart, getAllGRNcart, getGRNcartByID, updateGRNcart, deleteGRNcart } = require("../grncart/grncart.controller");

const router = require("express").Router();

router.post("/", addNewGRNcart);
router.get("/", getAllGRNcart);
router.get("/:id", getGRNcartByID);
router.put("/", updateGRNcart);
router.delete("/:id", deleteGRNcart);

module.exports = router;
