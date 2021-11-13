const { addGRNinv, getGRNinv, getGRNinvbyID, updateGRNinv, deleteGRNinv } = require("../grn invoice/grninv.service")

module.exports = {

    addNewGRNinv : (req, res) => {
        const body = req.body;

        addGRNinv(body, (error, results) => {
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


    getAllGRNinv : (req, res) => {

        getGRNinv((error, results) => {
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


    getGRNinvByID : (req, res) => {
        const id = req.params.id;

        getGRNinvbyID(id, (error, results) => {
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


    updateGRNinv : (req, res) => {
        const body = req.body;

        updateGRNinv(body, (error, results) => {
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


    deleteGRNinv : (req, res) => {
        const id = req.params.id;

        deleteGRNinv(id, (error, results) => {
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