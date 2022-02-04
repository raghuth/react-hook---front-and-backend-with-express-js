import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  TextField,
  Button,
} from "@material-ui/core";
import axios from "axios";
import "./customers.css";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [input, setInput] = useState({
    customerName: "",
  });

  useEffect(() => {
    getCustomer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCustomer = () => {
    fetch("http://localhost:5000/api/customers")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((jsonRes) => setCustomers(jsonRes));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  };
  const submit = (event) => {
    event.preventDefault();
    const newCustomerList = {
      name: input.customerName,
    };
    axios.post("http://localhost:5000/api/create", newCustomerList, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    getCustomer();
    input.customerName = "";
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card sx={{ maxWidth: 345 }} style={{ margin: "70px" }}>
            <CardHeader
              title="Endpoints"
              subheader="Create and manage platform endpoints."
              className="card-grid"
            />
            <CardContent>
              <div className="input-grid">
                <TextField
                  fullWidth
                  label="Customer Name"
                  id="customerName"
                  name="customerName"
                  value={input.customerName || ""}
                  onChange={handleChange}
                  id="fullWidth"
                  placeholder="add customer"
                  color="primary"
                />
                <Button
                  variant="contained"
                  style={{ marginLeft: 24 }}
                  onClick={submit}
                >
                  Add
                </Button>
              </div>
            </CardContent>
            <CardActions disableSpacing></CardActions>
            <CardContent>
              Customers list
              {customers?.map((data, i) => (
                <div key={i}>{data.name}</div>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default Customers;
