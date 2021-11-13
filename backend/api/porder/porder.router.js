const { addNewOrder, getAllOrders, getOrderByID, deleteOrder, updateOrder } = require("./porder.controller");

const router = require("express").Router();

router.post("/", addNewOrder);
router.get("/", getAllOrders);
router.get("/:id", getOrderByID);
router.put("/", updateOrder);
router.delete("/:id", deleteOrder);

module.exports = router;
