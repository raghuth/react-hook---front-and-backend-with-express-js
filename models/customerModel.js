const mongoose = require("mongoose");

const customersScheme = {
  name: String,
};

const Customer = mongoose.model("Customer", customersScheme);

module.exports = Customer;
