const {addGRNcart, getAllGRNcart, getGRNcartByID, updateGRNcart, deleteGRNcart} = require("./grncart.service")

module.exports = {

    addNewGRNcart : (req, res) => {
        const body = req.body;

        addGRNcart(body, (error, results) => {
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


    getAllGRNcart : (req, res) => {
        
        getAllGRNcart((error, results) => {
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


    getGRNcartByID : (req, res) => {
        const id = req.params.id;

        getGRNcartByID(id, (error, results) => {
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


    updateGRNcart : (req, res) => {
        const body = req.body;

        updateGRNcart(body, (error, results) => {
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


    deleteGRNcart : (req, res) => {
        const id= req.params.id;

        deleteGRNcart(id, (error, results) =>{
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