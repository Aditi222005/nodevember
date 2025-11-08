import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  
  // This field matches what the controller is saving
  orderItems: [
    {
      title: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      imageUrl: { type: String },
      book: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Book",
      },
    },
  ],
  
  // These fields are required by the controller
  shippingAddress: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  status: {
    type: String,
    required: true,
    default: "placed",
    enum: ["placed", "shipped", "delivered", "cancelled"],
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt
});

const Order = mongoose.model("Order", orderSchema);
export default Order;