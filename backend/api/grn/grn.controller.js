const { addGRN, getGRN, getGRNbyID, updateGRN, deleteGRN } = require("../grn/grn.service")

module.exports = {

    addNewGRN : (req, res) => {
        const body = req.body;

        addGRN(body, (error, results) => {
            if(error){
                return res.status(500).json({
                    success : 0,
                    message : "Database connection error"
                })
            }
            return res.status(200).json({
                success : 1,
                message : "Successfully added",
                data : results
            })
        })
    },


    getAllGRN : (req, res) => {
        getGRN((error, results) => {
            if(error){
                return res.status(500).json({
                    success : 0,
                    message : "Database connection error"
                })
            }
            return res.status(200).json({
                success : 1,
                message : "Successfull",
                data : results
            })
        })
    },


    getGRNByID : (req, res) => {
        const id = req.params.id;

        getGRNbyID(id, (error, results) => {
            if(error){
                return res.status(500).json({
                    success : 0,
                    message : "Database connection error"
                })
            }
            return res.status(200).json({
                success : 1,
                message : "Successfull",
                data : results
            })
        })
    },


    updateGRN : (req, res) => {
        const body = req.body;

        updateGRN(body, (error, results) => {
            if(error){
                return res.status(500).json({
                    success : 0,
                    message : "Database connection error"
                })
            }
            return res.status(200).json({
                success : 1,
                message : "Successfully updated",
                data : results
            })
        })
    },


    deleteGRN : (req, res) => {
        const id = req.params.id;

        deleteGRN(id, (error, results) => {
            if(error){
                return res.status(500).json({
                    success : 0,
                    message : "Database connection error"
                })
            }
            return res.status(200).json({
                success : 1,
                message : "Successfully deleted",
                data : results
            })
        })
    }
}