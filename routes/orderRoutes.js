const express = require("express");
const router = express.Router();
const orders = require("../models/ordersModel");



// Get all orders
router.get("/", async (req, res) => {
  try {
    const order = await orders.find({});
    res.send(order);
  } catch (error) {
    // console.error("Error getting orders:", error);
    res.status(500).send({ message: "Server error. Please try again later." });
  }
});



//create order
router.post("/add", async (req, res) => {
    // console.log("req.body", req.body);
  try {
    const order = new orders(req.body);
    await order.save();
    res.status(201).send(order);
  } catch (error) {
    // console.error("Error adding order:", error);
    res.status(500).send({ message: "Server error. Please try again later." });
  }
});


module.exports = router;
