const {addNewSupplier, 
        getAllSuppliers, 
        getSupplierByID, 
        deleteSupplier, 
        updateSupplier} = require('./supplier.controller');

const router = require("express").Router();    

router.post("/", addNewSupplier);
router.get("/", getAllSuppliers);
router.get("/:id", getSupplierByID);
router.put("/", updateSupplier);
router.delete("/:id", deleteSupplier);

module.exports = router;