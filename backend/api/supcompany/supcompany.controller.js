const { addSupCompany, getCompanyByID, getSupCompany, deleteSupCompanyById, updateSupCompany } = require("./supcompany.service");

module.exports = {

    //Add a new supplier company
    addNewSupCompany : (req, res) => {
        const body = req.body;

        addSupCompany(body, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success : 1,
                message : "Data added",
                data : results
            });
        })
    },

    //Show all supplier companies in the view

    getAllSupCompnies : (req, res) => {

        getSupCompany((err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success : 1,
                data : results
            });
        });
    },

    //get supplier company by id
    getSupCompanyByID: (req, res) => {
        id = req.params.id;

        getCompanyByID(id, (err, results) => {

            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
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
                data : results
            });
        }); 
    },  


    //update supplier company
    updateSupCompany: (req, res) => {
        const body = req.body;

        updateSupCompany(body, (err,results) => {
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
    },
    
    //delete a supplier company
    deleteSupCompany : (req, res) => {
        
        id = req.params.id;

        deleteSupCompanyById(id, (err, results) => {

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
    }

    
};