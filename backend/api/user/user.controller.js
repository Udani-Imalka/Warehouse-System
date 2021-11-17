const { addUser, getUser, getByID, updateUser, deleteUserbyId } = require("./user.service");

module.exports = {

    //Add a new user
    addNewUser : (req, res) => {
        const body = req.body;

        addUser(body, (err, results) => {
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

    //Show all users in the view
    getAllUSers : (req, res) => {
        getUser((err, results) => {
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

    //get user by id
    getUserByID : (req, res) => {
        id = req.params.id;

        getByID(id, (err, results) => {

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


    //update user
    updateUser : (req, res) => {
        const body = req.body;

        updateUser(body, (err,results) => {
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
    
    //delete a user
    deleteUser : (req, res) => {
        
        id = req.params.id;

        deleteUserbyId(id, (err, results) => {

            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            // else if(!results){
            //     return res.status(404).json({
            //         success : 0,
            //         message : "Record not found"
            //     });
            // }
            return res.status(200).json({
                success : 1,
                message : "Successfully deleted",
                data : results
            });
        }); 
    }

    
};