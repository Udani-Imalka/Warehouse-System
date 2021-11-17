const {addPoc, getAllPoc, getPocByID, deletePoc, updatePoc} = require('../pocart/pocart.service')

module.exports = {

    addNewPoc : (req, res) => {
        const body = req.body;

        addPoc(body, (err, results) => {
            if(err){
                return res.status(500).json({
                    success : 0,
                    message : "Database connection error"
                });
            }
            return res.status(200).json({
                success : 1,
                message : "Added successfully",
                data : results
            })
        })
    },


    getAllPoc : (req, res) => {
        getAllPoc((err, results) => {
            if(err){
                return res.status(500).json({
                    success : 0,
                    message : "Database connection error"
                });
            }
            return res.status(200).json({
                success : 1,
                message : "Successfull",
                data : results
            })
        })
    },

    getPocByID : (req, res) => {
        id = req.params.id;

        getPocByID(id, (error, results) => {
            if(error){
                return res.status(500).json({
                    success : 0,
                    message : "Database conection error"
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
            })
        })
    },

    deletePoc : (req, res) => {
        id = req.params.id;

        deletePoc(id, (err, results) => {

            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            
            return res.status(200).json({
                success : 1,
                message : "Successfully deleted",
                data : results
            });
        }); 
    },

    updatePoc : (req, res) => {
        const body = req.body;

        updatePoc(body, (err,results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success : 1,
                message : "Data updated",
                data : results
            });
        })
    }
}