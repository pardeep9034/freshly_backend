const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    pricePerKg: { 
      type: Number, 
      required: function () {
        return !this.isPacket; // Required only if isPacket is false
      } 
    },
    packetPrice: { 
      type: Number, 
      required: function () {
        return this.isPacket; // Required only if isPacket is true
      } 
    },
    image: { type: String, default: 'https://via.placeholder.com/150' },
    quantity: { type: Number, required: true },
    description: { type: String, required: true },
    primaryCategory: { type: String, required: true },
    secondaryCategory: { type: String },
    isPacket: { type: Boolean, required: true },
    weight: { 
      type: Number, 
      required: function () {
        return this.isPacket; // Required only for packet-based products
      } 
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
