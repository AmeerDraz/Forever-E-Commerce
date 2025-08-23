import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// placing orders using COD Meethod

const PlaceOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now(),
        };

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, { cartData: {} })
        
        res.json({success:true, message:"Order Placed"})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
};
// placing orders using Stripe Meethod

const PlaceOrderStripe = async (req, res) => {};
// placing orders using Paypal Meethod

const PlaceOrderPaypal = async (req, res) => {};

// All Orders data for Admin panel
const allOrders = async (req, res) => {};

// All Orders data for Frontend
const userOrders = async (req, res) => {};

// update order status
const updateStatus = async (req, res) => {};

export {
    PlaceOrder,
    PlaceOrderStripe,
    PlaceOrderPaypal,
    allOrders,
    userOrders,
    updateStatus,
};
