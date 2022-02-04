const express = require("express");
const router = express.Router();
const Customer = require("../models/customerModel") 


router.route("/api/create").post((req , res)=> {   
    const name = req.body.name;
    const newCustomer = new Customer ({
        name,
    })
    newCustomer.save()
        .then(newCustomer => {
            res.status(200).json({'res': 'customer added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new customer failed');
        });
})

	
router.route("/api/customers").get((req , res)=> {   
    Customer.find()
    .then(foundCustomer => res.json(foundCustomer))       
})

module.exports = router;