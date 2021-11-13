const {addSupplier, 
        getSuppliers, 
        getSupplierByID, 
        updateSupplier, 
        deleteSupplierByID} = require('./supplier.service');

module.exports = {

    addNewSupplier : (req, res) => {
        const body = req.body;

        addSupplier(body, (error, results) => {

            if(error){
                return res.status(500).json({
                    success : 0,
                    message : "Database connection error"
                });
            }
            return res.status(200).json({
                success : 1,
                message : "Added successfully",
                data : results
            });
        });
    },


    getAllSuppliers : (req, res) => {

        getSuppliers((error, results) => {

            if(error){
                return res.status(500).json({
                    success : 0,
                    message : "Database connection error"
                });
            }
            return res.status(200).json({
                success : 1,
                message : "Successful",
                data : results
            });
        });
    },


    getSupplierByID : (req, res) => {
        id = req.params.id

        getSupplierByID(id, (error, results) => {

            if(error){
                return res.status(500).json({
                    success : 0,
                    message : "Database connection error"
                });
            }
            else if(!results){
                return res.status(404).json({
                    success : 0,
                    message : "Record not found"
                });
            }

            return res.status(200).json({
                success : 1,
                message : "Successful",
                data : results
            });
        })
    },


    deleteSupplier : (req, res) => {
        id = req.params.id

        deleteSupplierByID(id, (error, results) => {

            if(error){
                return res.status(500).json({
                    success : 0,
                    message : "Database connection error"
                });
            }
            else if(!results){
                return res.status(404).json({
                    success : 0,
                    message : "Record not found"
                });
            }

            return res.status(200).json({
                success : 1,
                message : "Deleted successfully",
                data : results
            });            
        });
    },


    updateSupplier : (req, res) => {
        const body = req.body;

        updateSupplier(body, (error, results) => {
            if(error){
                return res.status(500).json({
                    success : 0,
                    message : "Database connection error"
                });
            }
            else if(!results){
                return res.status(404).json({
                    success : 0,
                    message : "Record not found"
                });
            }

            return res.status(200).json({
                success : 1,
                message : "Updated successfully",
                data : results
            });
        });
    }
}