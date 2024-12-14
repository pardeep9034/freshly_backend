const express = require("express");
const router = express.Router();
const products= require("../models/productModel");
const {verifyuser}=require('../utils/middelware');




// Get all products
router.get("/", async (req, res) => {
  try {
    const product = await products.find({});
    res.send(product);
  } catch (error) {
    console.error("Error getting products:", error);
    res.status(500).send({ message: "Server error. Please try again later." });
  }
});

//add product

router.post("/add", verifyuser, async (req, res) => {
  try {
    const product = new products(req.body);
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).send({ message: "Server error. Please try again later." });
  }
});

//delete product
router.delete("/:id", verifyuser, async (req, res) => {
  console.log("Deleting product with ID:", req.params.id);
  try {
    const product = await products.findById(req.params.id);

    if (product) {
      await products.findByIdAndDelete(req.params.id); // Direct deletion
      res.status(200).send({ message: "Product deleted successfully." });
    } else {
      res.status(404).send({ message: "Product not found." });
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).send({ message: "Server error. Please try again later." });
  }
});

//update product

router.put("/:id", verifyuser, async (req, res) => {
 
  try {
    const product = await products.findById(req.params.id);

    if (product) {
      console.log("Updating product with ID:", req.params.id);
     if(req.body.name){
      product.name = req.body.name;
      }
      if(product.isPacket){
        product.packetPrice = req.body.packetPrice;
      }
      else{
        product.pricePerKg = req.body.pricePerKg;
      }
      if(req.body.quantity){
        product.quantity = req.body.quantity;
      }

      await product.save();
      res.status(200).send(product);
    } else {
      res.status(404).send({ message: "Product not found." });
    }
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).send({ message: "Server error. Please try again later." });
  }
});





module.exports = router;