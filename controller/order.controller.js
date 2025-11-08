import Order from "../model/order.model.js";
import Book from "../model/book.model.js";
import User from "../model/User.model.js";

export const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;
   
    const { book, shippingAddress, paymentMethod } = req.body;


    if (!book || book.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No books provided"
      });
    }

    if (!shippingAddress) {
      return res.status(400).json({ success: false, message: "Shipping address is required" });
    }
    if (!paymentMethod) {
      return res.status(400).json({ success: false, message: "Payment method is required" });
    }

    let totalPrice = 0;
    const orderItems = []; 

    for (const { bookId, quantity = 1 } of book) {
      const book = await Book.findById(bookId);
      
      if (!book) {
        return res.status(404).json({
          success: false,
          message: `Book not found: ${bookId}`
        });
      }

      if (book.stock < quantity) {
        return res.status(400).json({
          success: false,
          message: `Out of stock for "${book.title}". Only ${book.stock} left.`
        });
      }

      totalPrice += book.price * quantity;

      orderItems.push({
        title: book.title,
        quantity: quantity,
        price: book.price, 
        imageUrl: book.imageUrl,
        book: book._id, 
      });

      book.stock -= quantity;
      await book.save();
    }

    const order = await Order.create({
      user: userId,
      orderItems: orderItems, 
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod,
      totalPrice: totalPrice,
      status: "placed"
    });

    await User.findByIdAndUpdate(userId, { $push: { orders: order._id } });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order
    });

  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};

export const getOrderHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    // 7. Find orders. We no longer need to .populate() the 'book' field
    // because 'orderItems' already has the title, price, and imageUrl.
    const orders = await Order.find({ user: userId })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders
    });

  } catch (error) {
    console.error("Get order history error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};