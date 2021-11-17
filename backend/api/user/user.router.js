const { addNewUser, getAllUSers, getUserByID, updateUser, deleteUser } = require("./user.controller");

const router = require("express").Router();

router.post("/", addNewUser);
router.get("/", getAllUSers);
router.get("/:id", getUserByID);
router.put("/", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
