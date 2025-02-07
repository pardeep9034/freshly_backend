const mongoose = require('mongoose');

// Define the order schema
const orderSchema = new mongoose.Schema(
  {
    // Reference to the seller (User)
    
    seller: {
      type: String,
      required: true,
    },
    sellername: {
      type: String,
      required: true,
    },

    // Array of order items
    orderItems: [
      {
        name: { type: String, required: true }, // Add name for the order item
        product: {
          type: String,
          
          required: true, // Ensure a product is associated with each order item
        },
        quantity: {
          type: String,
          required: true,
         
        },
        price: {
          type: Number,
          required: true,
          min: 0, // Ensure the price is non-negative
        },
       
    } 
    ],

    // Total price of the order
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
      min: 0, // Validate that total price is non-negative
    },

    // Payment details
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    method: {
      type: String,
      required: true,
      enum: ['Cash', 'Card', 'UPI', 'Net Banking'], // Restrict to specific payment methods
    },

    // Shipping details (uncomment if needed)
    // shippingAddress: {
    //   address: { type: String, required: true },
    //   city: { type: String, required: true },
    //   postalCode: { type: String, required: true },
    //   country: { type: String, required: true },
    // },

    // Delivery details (optional)
    // isDelivered: {
    //   type: Boolean,
    //   required: true,
    //   default: false,
    // },
    // deliveredAt: {
    //   type: Date,
    // },

    // Tax and shipping costs (uncomment if needed for advanced calculations)
    // taxPrice: {
    //   type: Number,
    //   required: true,
    //   default: 0.0,
    // },
    // shippingPrice: {
    //   type: Number,
    //   required: true,
    //   default: 0.0,
    // },

    // Optional timestamps (e.g., createdAt, updatedAt) are enabled automatically
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);


// Create and export the Order model
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
