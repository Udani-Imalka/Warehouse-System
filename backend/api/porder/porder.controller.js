const { addPurchaseOrder, getPurchaseOrder, getPurchaseOrderByID, deletePurchaseOrder, updatePurchaseOrder } = require("./porder.service");

module.exports = {

    //Add a new order
    addNewOrder : (req, res) => {
        const body = req.body;

        addPurchaseOrder(body, (err, results) => {
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
    getAllOrders : (req, res) => {
        
        getPurchaseOrder((err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success : 1,
                message : "Successful",
                data : results
            });
        });
    },

    //get order by id
    getOrderByID : (req, res) => {
        id = req.params.id;

        getPurchaseOrderByID(id, (err, results) => {

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


    //update order
    updateOrder : (req, res) => {
        const body = req.body;

        updatePurchaseOrder(body, (err,results) => {
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
    
    //delete a order
    deleteOrder : (req, res) => {
        
        id = req.params.id;

        deletePurchaseOrder(id, (err, results) => {

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